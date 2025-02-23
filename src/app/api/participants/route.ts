// app/api/participants/route.ts
import { NextResponse } from 'next/server';
import Form, { Participant } from 'src/models/Form';    
import mongoose from 'mongoose';
import connectDB from 'src/lib/mongodb';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  
  try {
    const forms = await Form.find().lean();
    const participants: Set<Participant> = new Set();

    forms.forEach(form => {
      const baseParticipant = {
        id: new mongoose.Types.ObjectId().toString(),
        formId: (form._id as any).toString(),
        formType: form.formType,
        title: form.title,
        contact: form.contact,
        language: form.language,
        summary: form.summary,
        finalVersion: form.finalVersion,
        technicalMetadata: form.technicalMetadata,
        registrationDate: form.createdAt?.toISOString() || new Date().toISOString(),
        status: 'pending' as const
      };

      switch(form.formType) {
        case 'communication':
          // Add main author
          participants.add({
            ...baseParticipant,
            name: form.contact.name,
            email: form.contact.email,
            institution: form.contact.institution,
            type: 'author',
            communicationDetails: form.communicationDetails
          });

          // Add co-authors
          form.communicationDetails?.coAuthors?.forEach((coAuthor: any) => {
            participants.add({
              ...baseParticipant,
              id: new mongoose.Types.ObjectId().toString(),
              name: coAuthor.name,
              email: coAuthor.email,
              institution: coAuthor.institution,
              type: 'coAuthor',
              communicationDetails: form.communicationDetails
            });
          });
          break;

        case 'symposium':
          if (form.symposiumDetails?.coordinator) {
            // First add the coordinator
            participants.add({
              ...baseParticipant,
              name: form.symposiumDetails.coordinator.name,
              email: form.symposiumDetails.coordinator.email,
              institution: form.symposiumDetails.coordinator.affiliation,
              type: 'coordinator',
              symposiumDetails: form.symposiumDetails
            });

            // Then add unique contributions by checking if participant doesn't already exist
            form.symposiumDetails.contributions?.forEach((contribution: any) => {
              const participantExists = Array.from(participants).some(
                (p: any) => 
                  p.email === contribution.author.email && 
                  p.formId === (form._id as any).toString()
              );

              if (!participantExists) {
                participants.add({
                  ...baseParticipant,
                  id: new mongoose.Types.ObjectId().toString(),
                  name: contribution.author.name,
                  email: contribution.author.email,
                  institution: contribution.author.affiliation,
                  type: 'coAuthor',
                  symposiumDetails: form.symposiumDetails
                });
              }
            });
          }
          break;

        case 'roundtable':
          if (form.roundtableDetails?.organizer) {
            participants.add({
              ...baseParticipant,
              name: form.roundtableDetails.organizer.name,
              email: form.roundtableDetails.organizer.institution,
              institution: form.roundtableDetails.organizer.institution,
              type: 'organizer',
              roundtableDetails: form.roundtableDetails
            });

            // Add roundtable participants
            form.roundtableDetails.participants?.forEach((participant: any) => {
              participants.add({
                ...baseParticipant,
                id: new mongoose.Types.ObjectId().toString(),
                name: participant.name,
                email: participant.email,
                institution: participant.institution,
                type: 'coAuthor',
                roundtableDetails: form.roundtableDetails
              });
            });
          }
          break;
      }
    });

    let filteredParticipants = Array.from(participants);
    
    // Apply search filter
    if (search) {
      filteredParticipants = filteredParticipants.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.institution?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calculate pagination
    const totalItems = filteredParticipants.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);

    return NextResponse.json({
      participants: paginatedParticipants,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch participants' },
      { status: 500 }
    );
  }
}
// app/api/participants/route.ts
import { NextResponse } from 'next/server';
import Form, { Participant } from 'src/models/Form';    
import mongoose from 'mongoose';
import connectDB from 'src/lib/mongodb';

export async function GET() {
  await connectDB();

  try {
    const forms = await Form.find().lean();
    const participants: Participant[] = [];

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
          participants.push({
            ...baseParticipant,
            name: form.contact.name,
            email: form.contact.email,
            institution: form.contact.institution,
            type: 'author',
            communicationDetails: form.communicationDetails
          });

          // Add co-authors
          form.communicationDetails?.coAuthors?.forEach((coAuthor: any) => {
            participants.push({
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
            participants.push({
              ...baseParticipant,
              name: form.symposiumDetails.coordinator.name,
              email: form.symposiumDetails.coordinator.email,
              institution: form.symposiumDetails.coordinator.affiliation,
              type: 'coordinator',
              symposiumDetails: form.symposiumDetails
            });
          }
          break;

        case 'roundtable':
          if (form.roundtableDetails?.organizer) {
            participants.push({
              ...baseParticipant,
              name: form.roundtableDetails.organizer.name,
              email: form.roundtableDetails.organizer.institution,
              institution: form.roundtableDetails.organizer.institution,
              type: 'organizer',
              roundtableDetails: form.roundtableDetails
            });

            // Add roundtable participants
            form.roundtableDetails.participants?.forEach((participant: any) => {
              participants.push({
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

    return NextResponse.json(participants);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch participants' },
      { status: 500 }
    );
  }
}
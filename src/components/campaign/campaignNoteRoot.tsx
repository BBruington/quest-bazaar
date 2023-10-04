'use-client'
import CampaignNotesMain from './campaignNotesMain';
import CampaignNotesSideBar from './campaignNotesSideBar';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';

export default function Notes() {


  return (
    <>
    
      <div className="flex justify-start">
          <CampaignNotesSideBar 
          />
          <CampaignNotesMain        
          />
      </div>
    </>
  )
}


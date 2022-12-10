import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import CopyToClipboard from 'react-copy-to-clipboard';
import { BsBookmarks, BsFillPauseCircleFill } from 'react-icons/bs';
import 'chart.js/auto';

export default function PresentingSlide({
  question,
  presenting,
  handleEndPresentation,
  chartData,
  presentationId,
}) {
  // link
  const baseURL = window.location.href.replace(window.location.pathname, '');
  const [presentationLink, setPresentationLink] = useState({
    value: `${baseURL}/presentation/${presentationId}`,
    copied: false,
  });
  return (
    <div className="relative bg-light p-2 rounded-1">
      <div
        style={{ width: '100%' }}
        className="position-relative d-flex flex-column align-items-center h-100"
      >
        <p>{question}</p>

        {presenting && (
          <Button
            style={{ position: 'absolute', top: '10px', left: '10px' }}
            variant="secondary"
            onClick={handleEndPresentation}
            size="sm"
          >
            <BsFillPauseCircleFill size={22} /> End Presentation
          </Button>
        )}

        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CopyToClipboard text={presentationLink.value}>
            <Button
              onClick={() => {
                setPresentationLink({
                  ...presentationLink,
                  copied: true,
                });
              }}
              size="sm"
              className="p-1"
              variant={presentationLink.copied ? 'secondary' : 'primary'}
            >
              <BsBookmarks /> {presentationLink.copied ? 'Copied' : 'Copy link'}
            </Button>
          </CopyToClipboard>
        </div>

        <Bar
          data={{
            labels: chartData.map((i) => i.labels),
            datasets: [
              {
                label: 'Rating',
                data: chartData.map((i) => i.data),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaHackerrank } from 'react-icons/fa';
import { FcBarChart } from 'react-icons/fc';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import getPresentation from '~/api/normal/presentation/getPresentation';
import createSlide from '~/api/normal/slide/createSlide';
import deleteSlide from '~/api/normal/slide/deleteSlide';
import getSlideOfPresent from '~/api/normal/slide/getSlideOfPresent';
import updateSlide from '~/api/normal/slide/updateSlide';
import Chart from '~/components/Chart';
import Loading from '~/components/Loading';
import Question from '~/components/Questions';
import Constant from '~/constants';
import styles from './slide.module.css';
import SlideItem from './SlideItem';
import SlideToolBar from './SlideToolBar';

// sth
const CustomDropdown = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className={clsx(styles.slide_operator_dropButton)}
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <RiArrowDropDownLine size={30} />
  </button>
));

const SlideOption = [
  {
    Icon: FcBarChart,
    Name: 'multiChoice',
  },
  {
    Icon: FaHackerrank,
    Name: 'ranking',
  },
];

export default React.memo(function Slide() {
  // get presentation
  const [presentation, setPresentation] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ListSlide, setListSlide] = useState(undefined);
  const [SlideEditing, setSlideEditing] = useState();

  const [chartName, setChartName] = useState('bar');
  // important
  const [question, setQuestion] = useState('Enter Your Question');
  // important
  const [SlideType, setSlideType] = useState(SlideOption[0]);
  // important
  const { id: presentationId } = useParams();
  // important
  const [ChartData, setChartData] = useState([]);

  // handle socket message
  const handleReceivedMessage = (event) => {
    const receivedEvent = JSON.parse(event);
    if (
      receivedEvent.metaData.messageType ===
      Constant.ServerMessageType.updatedSlide
    ) {
      const receivedSlide = receivedEvent.message;
      // update list slide
      const receivedList = ListSlide.map((slide) => {
        if (slide.id === receivedSlide.id) return receivedSlide;
        return slide;
      });
      setListSlide(receivedList);

      // update editting slide
      if (receivedSlide.id === SlideEditing.id) {
        setSlideEditing(receivedSlide);
      }
    }
  };

  // connect socket
  const { sendMessage } = useWebSocket(Constant.SocketURL, {
    onOpen: () => {
      console.log('Open socket');
    },
    onClose: () => {
      console.log('Close socket');
    },
    onError: () => {
      console.log('Error socket');
    },
    shouldReconnect: () => true,
    onMessage: (message) => handleReceivedMessage(message?.data),
  });

  useEffect(() => {
    if (presentation == null) return;
    sendMessage(
      JSON.stringify({
        metaData: {
          roomName: presentation.roomName,
          clientType: Constant.ClientType.host,
          messageType: Constant.ClientMessageType.joinRoom,
        },
        message: null,
      })
    );
    // eslint-disable-next-line consistent-return
    return () =>
      sendMessage(
        JSON.stringify({
          metaData: {
            roomName: presentation.roomName,
            clientType: Constant.ClientType.host,
            messageType: Constant.ClientMessageType.leaveRoom,
          },
        })
      );
  }, [presentation]);

  const [answer, setAnswer] = useState(null);
  useEffect(() => {
    const asyncGetSlide = async () => {
      try {
        setLoading(true);

        // get presentation
        const presentationRes = await getPresentation(presentationId);
        setPresentation(presentationRes.data.object);
        // get slide
        const listSlide = await getSlideOfPresent(presentationId);
        setListSlide(listSlide);
        setSlideEditing(listSlide[0]);
        return listSlide;
      } catch (e) {
        return null;
      } finally {
        setLoading(false);
      }
    };
    asyncGetSlide();
  }, []);

  useEffect(() => {
    if (!SlideEditing) return;

    setQuestion(SlideEditing.content);
    const SlideLabel = SlideEditing.options;
    const SlideData = SlideLabel.map((label) => {
      const NumberRecord = SlideEditing?.userRecords?.filter((record) => {
        return record.answer === label;
      });
      return NumberRecord ? NumberRecord.length : 0;
    });

    setChartData(
      SlideLabel.map((value, index) => {
        return {
          id: `${index}`,
          labels: value,
          data: SlideData[index],
        };
      })
    );
  }, [SlideEditing]);

  const [isNeedUpdate, setIsNeedUpdate] = useState(false);
  const handleFlagUpdate = () => {
    setIsNeedUpdate(!isNeedUpdate);
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      setSaving(true);
      const response = await deleteSlide(presentationId, slideId);
      setSaving(false);

      setListSlide(
        ListSlide.filter((item) => {
          return item.id !== slideId;
        })
      );
      return response;
    } catch (err) {
      return null;
    }
  };

  const handleAddSlide = async () => {
    try {
      setSaving(true);
      const response = await createSlide(presentationId);
      setSaving(false);
      setListSlide([...ListSlide, response.data.object]);
      return response;
    } catch (err) {
      return null;
    }
  };

  const handleUpdateSlide = async () => {
    try {
      setSaving(true);
      const response = await updateSlide(
        presentationId,
        SlideEditing.id,
        answer,
        question,
        ChartData.map((item) => item.labels)
      );
      const updatedSlide = response.data.object;
      const updatedList = ListSlide.map((slide) => {
        if (slide.id === updatedSlide.id) return updatedSlide;
        return slide;
      });
      setListSlide(updatedList);
      return response;
    } catch (err) {
      return null;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    handleUpdateSlide();
  }, [isNeedUpdate]);

  const activeSlide = async (slide) => {
    setSlideEditing(slide);
  };

  return (
    <div className={clsx(styles.Presentation_container)}>
      {loading ? <Loading /> : <div />}
      <SlideToolBar
        handleAddSlide={async () => {
          await handleAddSlide();
        }}
        saving={saving}
      />
      <div className={clsx(styles.Slide_workspace)}>
        <div className={clsx(styles.Slide_review)}>
          {ListSlide?.map((slide, index) => (
            <>
              <SlideItem
                key={slide.id}
                slide={slide}
                handleActive={() => activeSlide(slide)}
                active={slide === SlideEditing}
                index={index}
                handleDeleteSlide={handleDeleteSlide}
              />
              <hr />
            </>
          ))}
        </div>
        <div className={clsx(styles.Slide_editor)}>
          <div className={clsx(styles.Slide_editor_item)}>
            <div
              className={clsx(styles.Slide_editorItem_body, {
                [styles.chartStyle]: chartName === 'circle',
              })}
            >
              <p>{question}</p>
              <Chart
                type={chartName}
                labels={ChartData.map((a) => a.labels)}
                data={ChartData.map((a) => a.data)}
              />
            </div>
          </div>
        </div>
        <div className={clsx(styles.Slide_operator)}>
          <div className={clsx(styles.Slide_operator_type)}>
            <p className="fw-bold">Slide type</p>
            <div className={clsx(styles.Slide_operatorType_dropdown)}>
              <p>
                <span>
                  <SlideType.Icon size={30} />
                </span>
                {SlideType.Name}
              </p>
              <Dropdown>
                <Dropdown.Toggle as={CustomDropdown} />

                <Dropdown.Menu className={clsx(styles.Slide_typeMenu)}>
                  {SlideOption.map((item) => (
                    <Dropdown.Item
                      key={item.Name}
                      onClick={() => {
                        setSlideType(item);
                      }}
                      className={clsx(styles.Slide_typeItem)}
                      href="#/action-1"
                    >
                      <p>
                        <item.Icon size={30} />
                        {item.Name}
                      </p>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Question
            data={ChartData}
            setChartName={setChartName}
            question={question}
            setQuestion={setQuestion}
            setData={setChartData}
            SlideType={SlideType.Name}
            answer={answer}
            setAnswer={setAnswer}
            setIsNeedUpdate={handleFlagUpdate}
          />
        </div>
      </div>
    </div>
  );
});

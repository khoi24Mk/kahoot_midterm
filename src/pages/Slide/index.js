/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPlayFill } from 'react-icons/bs';
import { CiImport } from 'react-icons/ci';
import { FaHackerrank, FaUserCircle } from 'react-icons/fa';
import { FcBarChart, FcSettings } from 'react-icons/fc';
import { GoKebabVertical } from 'react-icons/go';
import { GrFormAdd } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import useWebSocket from 'react-use-websocket';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import Chart from '~/components/Chart';
import Question from '~/components/Questions';
import styles from './slide.module.css';
import getSlideOfPresent from '~/api/normal/getSlideOfPresent';
import createSlide from '~/api/normal/createSlide';
import deleteSlide from '~/api/normal/deleteSlide';
import Loading from '~/components/Loading';

function Slide() {
  // connect socket
  const { sendJsonMessage } = useWebSocket(
    'wss://kahoot-clone-vodinhphuc.herokuapp.com/socket',
    {
      onOpen: () => console.log('opened'),
      onClose: () => console.log('closed'),
      shouldReconnect: (closeEvent) => true,
    }
  );

  const [saving, setSaving] = useState(false);
  const [ListSlide, setListSlide] = useState([
    {
      id: 1,
      content: 'How is you?>>',
      options: [
        'This is answer>>>',
        "This isn't answer>>",
        'This is another answer',
      ],
      answer: 'This is answer',
      userRecords: [
        {
          answer: '',
          user: '',
        },
      ],
      presenting: true,
      links: [
        {
          rel: 'self',
          href: 'https://kahoot-clone-vodinhphuc.herokuapp.com/api/v1/presentation/1/slide/1',
        },
      ],
    },
  ]);
  const SlideOption = [
    {
      icon: FcBarChart,
      name: 'multiChoice',
    },
    {
      icon: FaHackerrank,
      name: 'ranking',
    },
  ];
  const [SlidePresenting, setSlidePresenting] = useState(ListSlide[0]);

  const [chartName, setChartName] = useState('bar');
  // important
  const [question, setQuestion] = useState('Enter Your Question');
  // important
  const [SlideType, setSlideType] = useState(SlideOption[0]);
  // important
  const { id } = useParams();
  // important
  const [ChartData, setChartData] = useState([
    {
      id: '1',
      labels: '1',
      data: 134,
    },
    {
      id: '2',
      labels: '2',
      data: 134,
    },
    {
      id: '3',
      labels: '3',
      data: 134,
    },
  ]);

  const asyncGetSlide = async () => {
    const listSlide = await getSlideOfPresent(id);
    console.log('LIST SLIDE');
    console.log(listSlide);
    setListSlide(listSlide);
    listSlide.map((slide) => {
      if (slide.presenting === true) {
        setSlidePresenting(slide);
      }
    });
    return listSlide;
  };
  useEffect(() => {
    setQuestion(SlidePresenting.content);
    const SlideLabel = SlidePresenting.options;
    const SlideData = SlideLabel.map((label) => {
      console.log('VERIFY');
      console.log(SlidePresenting);
      const NumberRecord = SlidePresenting.userRecords.filter((record) => {
        console.log('COMPARE');
        console.log(record.answer);
        console.log(label);
        return record.answer === label;
      });
      return NumberRecord ? NumberRecord.length : 0;
    });
    console.log('FIBOEIBFEOIBFNEOFB');
    console.log(SlideData);

    setChartData(
      SlideLabel.map((value, index) => {
        return {
          id: `${index}`,
          labels: value,
          data: SlideData[index],
        };
      })
    );
    // const SlideData = SlidePresenting.recorduserRecords;
  }, [SlidePresenting]);
  const query = useQuery({
    queryKey: ['ListSlide'],
    queryFn: asyncGetSlide,
  });

  const handleDeleteSlide = async (slide) => {
    setSaving(true);
    const response = await deleteSlide(id, slide);
    setSaving(false);
    return response;
  };

  const handleAddSlide = async () => {
    setSaving(true);
    const response = await createSlide(id);
    setSaving(false);
    return response;
  };

  const activeSlide = (slide) => {
    console.log('CLICK SLIDE');
    console.log(slide);
    setSlidePresenting(slide);
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={clsx(styles.slide_operator_dropButton)}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <GoKebabVertical />
      {/* <RiArrowDropDownLine size={30} /> */}
    </button>
  ));
  const CustomDropdown = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={clsx(styles.slide_operator_dropButton)}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* <GoKebabVertical /> */}
      <RiArrowDropDownLine size={30} />
    </button>
  ));

  return query.isLoading ? (
    <Loading />
  ) : (
    <div className={clsx(styles.Presentation_container)}>
      <div className={clsx(styles.Presentation_operator)}>
        <div className={clsx(styles.Presentation_operator_start)}>
          <Button
            onClick={() => {
              setListSlide([
                ...ListSlide,
                {
                  id: 1,
                  content: 'How is you?>>',
                  options: [
                    'This is answer>>>',
                    "This isn't answer>>",
                    'This is another answer',
                  ],
                  answer: 'This is answer',
                  userRecords: [
                    {
                      answer: '',
                      user: '',
                    },
                  ],
                  presenting: true,
                  links: [
                    {
                      rel: 'self',
                      href: 'https://kahoot-clone-vodinhphuc.herokuapp.com/api/v1/presentation/1/slide/1',
                    },
                  ],
                },
              ]);
              handleAddSlide();
            }}
          >
            <GrFormAdd color="white" size={20} />
            New Slide
          </Button>
          <Button>
            <CiImport style={{ margin: '5' }} />
            Import
          </Button>
        </div>
        <div className={clsx(styles.Presentation_operator_end)}>
          {saving ? (
            <span>
              <Spinner
                style={{ width: '1rem', height: '1rem' }}
                animation="border"
              />
              Saving
            </span>
          ) : (
            <div />
          )}
          <Button>
            <FcSettings size={30} />
            Seting
          </Button>
          <Button>
            <HiOutlineDocumentReport size={30} />
            Result
          </Button>
        </div>
      </div>
      <div className={clsx(styles.Slide_workspace)}>
        <div className={clsx(styles.Slide_review)}>
          {ListSlide.map((slide, index) => (
            <div
              onClick={() => activeSlide(slide)}
              className={clsx(styles.Slide_item, {
                [styles.active]: slide === SlidePresenting,
              })}
            >
              <div className={clsx(styles.Slide_item_operator)}>
                <div>
                  <p>{index}</p>
                  <BsFillPlayFill size={20} color="#196cff" />
                </div>
                <div>
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setListSlide(
                            ListSlide.filter((item) => {
                              return item.id !== slide.id;
                            })
                          );
                          handleDeleteSlide(slide.id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item>Active</Dropdown.Item>
                      <Dropdown.Item>Double</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className={clsx(styles.Slide_item_overview)}>
                <FcBarChart size={40} />
                <p>{question}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={clsx(styles.Slide_editor)}>
          {/* {ListSlide.map((slide) => ( */}
          <div
            // onClick={() => activeSlide(slide)}
            className={clsx(styles.Slide_editor_item)}
          >
            <div className={clsx(styles.Slide_editorItem_header)}>
              <p>This is code 113 </p>
            </div>
            <div className={clsx(styles.Slide_editorItem_body)}>
              <p>{SlidePresenting.content}</p>
              {() => {
                console.log('CHARDATA');
                console.log(ChartData);
                // console.log(chartData);
                // console.log(chartLabels);
              }}
              <Chart
                type={chartName}
                labels={ChartData.map((a) => a.labels)}
                data={ChartData.map((a) => a.data)}
                // data={data}
                // options={chartOptions}
              />
            </div>
            <div className={clsx(styles.Slide_editorItem_footer)}>
              <FaUserCircle size={25} />
              <p>10</p>
            </div>
          </div>
          {/* ))} */}
        </div>
        <div className={clsx(styles.Slide_operator)}>
          <div className={clsx(styles.Slide_operator_type)}>
            <p>Slide type</p>
            <div className={clsx(styles.Slide_operatorType_dropdown)}>
              <p>
                <span>
                  <SlideType.icon size={30} />
                </span>
                {SlideType.name}
              </p>
              <Dropdown>
                <Dropdown.Toggle as={CustomDropdown} />

                <Dropdown.Menu className={clsx(styles.Slide_typeMenu)}>
                  {SlideOption.map((item) => (
                    <Dropdown.Item
                      onClick={() => {
                        console.log('Click');
                        setSlideType(item);
                      }}
                      className={clsx(styles.Slide_typeItem)}
                      href="#/action-1"
                    >
                      <p>
                        <item.icon size={30} />
                        {item.name}
                      </p>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Question
            // label={chartLabels}
            data={ChartData}
            setChartName={setChartName}
            setQuestion={setQuestion}
            // setLabels={setChartLabels}
            setData={setChartData}
            SlideType={SlideType.name}
          />
        </div>
      </div>
    </div>
  );
}

export default Slide;

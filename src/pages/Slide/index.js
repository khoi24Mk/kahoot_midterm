/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useState } from 'react';
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
import Chart from '~/components/Chart';
import Question from '~/components/Questions';
import styles from './slide.module.css';

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
  //   const chartOptions = {
  //     scales: {
  //       xAxes: [
  //         {
  //           stacked: true,
  //           barPercentage: 0.2,
  //         },
  //       ],
  //       yAxes: [
  //         {
  //           stacked: true,
  //           barPercentage: 0.2,
  //         },
  //       ],
  //     },
  //   };

  // data chart

  //   const [chartLabels, setChartLabels] = useState([1, 2, 3]);
  //   const [chartData, setChartData] = useState([0, 0, 0]);

  const [chartName, setChartName] = useState('bar');
  const [question, setQuestion] = useState('Enter Your Question');

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
  //   const [data, setData] = useState({
  //     labels: [1, 2, 3],
  //     datasets: [{ data: [0, 0, 0] }],
  //   });

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
  //   const SlideOption = ['multiChoice', 'sth'];
  const [SlideType, setSlideType] = useState(SlideOption[0]);

  //   const [chartType, setChartType] = useState({
  //     icon: FcBarChart,
  //     name: 'bar',
  //   });

  const finalSpaceCharacters = [
    {
      id: '1',
      name: 'Gary Goodspeed',
      thumb: '/images/gary.png',
    },
    {
      id: '2',
      name: 'sthoco',
      thumb: '/images/gary.png',
    },
    {
      id: '3',
      name: 'hello',
      thumb: '/images/gary.png',
    },
    {
      id: '4',
      name: 'world',
      thumb: '/images/gary.png',
    },
  ];
  //   const layout = [{ id: 1, chart: Barchart }];

  //   const [characters, updateCharacters] = useState(finalSpaceCharacters);

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

  return (
    <div className={clsx(styles.Presentation_container)}>
      <div className={clsx(styles.Presentation_operator)}>
        <div className={clsx(styles.Presentation_operator_start)}>
          <Button>
            <GrFormAdd color="white" size={20} />
            New Slide
          </Button>
          <Button>
            <CiImport style={{ margin: '5' }} />
            Import
          </Button>
        </div>
        <div className={clsx(styles.Presentation_operator_end)}>
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
          <div className={clsx(styles.Slide_item, styles.active)}>
            <div className={clsx(styles.Slide_item_operator)}>
              <div>
                <p>1</p>
                <BsFillPlayFill size={20} color="#196cff" />
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={clsx(styles.Slide_item_overview)}>
              <FcBarChart size={40} />
              <p>{question}</p>
            </div>
          </div>
        </div>
        <div className={clsx(styles.Slide_editor)}>
          <div className={clsx(styles.Slide_editor_item)}>
            <div className={clsx(styles.Slide_editorItem_header)}>
              <p>This is code 113 </p>
            </div>
            <div className={clsx(styles.Slide_editorItem_body)}>
              <p>{question}</p>
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

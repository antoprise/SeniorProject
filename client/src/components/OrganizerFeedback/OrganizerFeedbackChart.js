import React, { Fragment } from "react";
import { Row, Col } from 'reactstrap';
import smile from '../../assets/4pts.svg';
import normal from '../../assets/3pts.svg';
import confuse from '../../assets/2pts.svg';
import sleep from '../../assets/1pts.svg';

import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const OrganizerFeedbackChart = (props) => {
    const {feedbackList} = props

    const ratingCount = (feedback) => {
        let rating1 = 0;
        let rating2 = 0;
        let rating3 = 0;
        let rating4 = 0;
        feedback.map(f => {
            if(f.emoticon === '1'){
                rating1++
            }
            if(f.emoticon === '2'){
                rating2++
            }
            if(f.emoticon === '3'){
                rating3++
            }
            if(f.emoticon === '4'){
                rating4++
            }
        })
        return [rating1,rating2,rating3,rating4]
    }   
    
    const rating = ratingCount(feedbackList);

    const data = {
        labels: [
            '1 pts',
            '2 pts',
            '3 pts',
            '4 pts'
        ],
        datasets: [{
            data: rating,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#000000'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#000000'
            ]
            
        }]
    }

    const options = {
        legend: {
            // labels: {
            //     fontColor: 'black'
            // }
            display: false
        },
        layout: {
            padding: {
                top:100
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: '#ffffff'
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false,
                    min: 0 
                },     
            }]
        },
        // ticks: {
        //     fontColor: '#666'
        // },
        plugins: {
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'end',
                color: 'white',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            }
        }
    }
    
      return (
        <div>
            <Row>
            <Bar data={data} options={options} /> 
            </Row>
            <Row>
                <Col className="text-center">
                    <img src={sleep} className="feedback-chart-img" ></img>
                </Col>
                <Col className="text-center">
                    <img src={confuse} className="feedback-chart-img" ></img>
                </Col>
                <Col className="text-center">
                    <img src={normal} className="feedback-chart-img" ></img>
                </Col>
                <Col className="text-center">
                    <img src={smile} className="feedback-chart-img" ></img>
                </Col>
            </Row>
        </div>
          
      )
}

export default OrganizerFeedbackChart ;

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class Chart extends React.Component {

    constructor() {
        super()

        this.translateData = this.translateData.bind(this);
        this.showData = this.showData.bind(this);

        this.state = {
            plotpoints: []
        }
    }

    translateData(plotpoints) {
        let newData = plotpoints.map( (point) => {
            let color;
            if (point.status === 'pass') {
              color = '#009688';
            } else if (point.status === 'error') {
              color = '#FF9800';
            } else if (point.status === 'fail') {
                color = '#F44336';
            }
            return {
                x: new Date(point.start_time),
                markerColor: color,
                y: point.duration,
                status: point.status,
                markerBorderColor: 'black',
                click: function(e) {
                    let border = e.dataPoint.markerBorderColor;
                    e.dataPoint.markerBorderColor = border === 'none' ? 'black' : 'none' ;
                    console.log('border color should now be ' + e.dataPoint.markerBorderColor)
                }
            }
        });
        return newData;
    }

    showData(status) {
        axios.get('http://localhost:3020/' + status)
             .then( res => {
                 this.setState({ plotpoints: res.data });
             })
             .catch( err => {
                 console.log(err);
             })
    }

    componentWillMount() {
        this.showData('');
    }

    componentDidUpdate() {

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            interactivityEnabled: true,
            zoomEnabled: true,
            theme: 'light2',
            axisX: {
                title: 'Event Date',
                margin: 0
            },
            axisY: {
                title: 'Duration (seconds)',
                margin: 20,
                gridDashType: 'dot',
                gridThickness: 1
            },
            title:{
                text:"Sauce Labs Analytics",
                padding: 15
            },
           
            data: [
            {     
                type: "scatter",
                toolTipContent: 'Duration: {y} <br/> Status: {status}',
                markerSize: 20,
                dataPoints: this.translateData(this.state.plotpoints)
            }

            ]
        });
    chart.render();
  }


  render() {
    return (
        <div>
            <h1> Guide to your data:</h1>
            <ul> To play with the chart, feel free to:
                <li> <strong>Drag over </strong> an area to restrict to that data</li>
                <li> Hover over a point to see specific info </li>
            </ul>
            <h4> See only specific cases:</h4>
            <ul className='actions'>
                <button className='pass' onClick={() => this.showData('pass')}> Passes</button>
                <button className='error' onClick={() => this.showData('error')}> Errors</button>
                <button className='fail' onClick={() => this.showData('fail')}> Fails</button>
                <button className='reset' onClick={() => this.showData('')}> Reset</button>
                
            </ul>
            
            
            <div id="chartContainer" style={{height: 450 + "px", width: 100 + "%"}}>
            </div>
            
        </div>
      
    );
  }

}

Chart.propTypes = {
    plotpoints: PropTypes.array
}

export default Chart;
import React, { Component } from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {Well, PageHeader} from 'react-bootstrap';

class Wrapper extends Component {
  constructor(props){
    super(props);

    this.state = {
      changeDate: '',
      image: '',
      copyright: '',
      explanation: '',
      hdurl: '',
      media_type: '',
      service_version: '',
      title: '',
      url: ''
    }
    this.handleDayChange = this.handleDayChange.bind(this);
  }

formatter(date){
  return `${date.getFullYear()}-${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay() }-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth() }`;
}

handleSubmit = (event) => {
  event.preventDefault();
    const url = `https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&date=${this.formatter(this.state.changeDate)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => this.setState({

      changeDate: moment(),
      image: data.url,
      copyright:data.copyright,
      explanation: data.explanation,
      hdurl: data.hdurl,
      media_type: data.media_type,
      service_version: data.service_version,
      title: data.title,
      url: data.url

  }))
  .catch(e => console.log('error', e));
}

handleDayChange = (day) => {

  this.setState({changeDate:day  });
}

render() {

  const {changeDate, image,  copyright, explanation, hdurl, media_type, service_version, title, url } = this.state;

    return (
        <div align="middle">
        <form onSubmit={this.handleSubmit}>
            <DayPickerInput onDayChange={this.handleDayChange}/>
            <button className="btn btn-primary">Search!</button>
         </form>
           <div className="image">
             <PageHeader>
                <small>{title}</small>
              </PageHeader>
                 <a href={hdurl}>
                   <img src={url} alt={title} />
                 </a>
                 <Well bsSize="large">{explanation}</Well>
                 <span>{copyright}</span>
           </div>
        </div>
      );
    }
}

export default Wrapper;

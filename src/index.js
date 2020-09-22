import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DATA from './data.js'


class Photo extends React.Component {
  render() {
    return (
      <div className="form-wrapper photo">
        <img style={{flex: 2}} 
        src={`${process.env.PUBLIC_URL}/assets/images/photo1.jpg`}  
        alt="portrait" />
      </div>
  )
  }
}

class GeneralInfo extends React.Component {
  render() {
    return (
      <div className="form-wrapper info">
        <div style={{flex: 7}} className="title-wrapper">
          {this.props.general_info.map((item, index) => {
            return (
              <div key={index} className="spans">
                <span className="title-span" >{item}</span>
              </div>
            )
          })}
        </div>
      </div>
  )
  }
}

class ListItems extends React.Component {
  render() {
    return (
      <div key={this.props.index} className="modal-body" >
        {this.props.keysList.map((key, index) => {
          let html;
          if (key !== "Text") {
            html =  <div key={index} className={index === 0 
              ? "flex-wrapper first-item" 
              : "flex-wrapper"} >
                <div className="list-items-property" style={{flex : 3}}>
                  {<span>{key.split("_").join(" ")} :  </span>}
                </div>

                <div style={{flex : 1}}></div>

                <div className="list-items-value" style={{flex : 6}}>
                  {<span>{validURL(this.props.item[key]) 
                  ? <a href={this.props.item[key]}>{this.props.item[key]
                  .split(".")[1]
                  .toUpperCase() 
                  + " Website"}</a>
                  : this.props.item[key]}</span>}
                </div>
              </div>
          }
        return html
        })}
      </div>
    )
  }
}

class TextDescription extends React.Component {
  render() {
    return (
      <div key={this.props.index} className="flex-wrapper" >
        <p>{this.props.item[this.props.keyValue]}</p>
      </div>
    )
  }
}

class Section extends React.Component {
  render() {
    return (
      <div id="list-wrapper">
        {this.props.data.map((item, index) => {
          let keys = Object.keys(item);
          let html;
          if (keys.length === 1) {
            let key = keys[0];
            html = <TextDescription key={index} index={index} item={item} keyValue={key} />;
          } else if (keys.length > 1) {
            html = <ListItems key={index} index={index} item={item} keysList={keys} />;
          }
          return html
        })}
      </div>
      )
  }
}

class MainPage extends React.Component {
  render() {
    let general_info = DATA[0]['general_info'];
    let studies = DATA[0]['studies'];
    let certificates = DATA[0]['certificates'];
    let experience = DATA[0]['experience'];
    
    return (
      <div>

        {/* top image (transparent background) */}
        <div className="top-image">
          <span>Curriculum vitae</span>
        </div>

        {/* main container */}
        <div className="container">

          {/* main content container */}
          <div style={{flex : 6}} id="task-container">
            {/* sticky top bar */}
            <div className="sticky-wrapper">
              <Photo />
              <GeneralInfo general_info={general_info} />
            </div>

            <div className="list-modals-plus-onPageNav">

              <div style={{flex : 8}} className="list-Modals">
                {/* modals list */}
                <div id="study" className="modal-section">
                  <div className="modal-header">
                    <h3><span className="label label-info">Study</span></h3>
                  </div>
                  <div >
                    <Section data={studies} />
                  </div>
                </div>

                <div id="certificates" className="modal-section">
                  <div className="modal-header">
                    <h3><span className="label label-info">Certificates</span></h3>
                  </div>
                  <div >
                  <Section data={certificates} />
                  </div>
                </div>

                <div id="experience" className="modal-section">
                  <div className="modal-header">
                    <h3><span className="label label-info">Experience</span></h3>
                  </div>
                  <div >
                  <Section data={experience} />
                  </div>
                </div>
              </div>

              <nav style={{flex : 2}} className="onPageNav">
                <ul className="toc-headings">
                    <li><a href="#study" className="active">Study</a></li>
                    <li><a href="#certificates" className="">Certificates</a></li>
                    <li><a href="#experience" className="">Experience</a></li>
                    <li><a href="#footer" className="">Footer</a></li>
                </ul>
              </nav>

            </div>

          </div>

        </div>

        {/* footer */}
        <footer id="footer">
          <p><span>Created by 
          <a href="https://fb.com/feerido"> Diref</a> | belgaidferid@gmail.com</span></p>
          <p><span>Source code for this website at <a href="https://github.com/Di-ref/diref">
          github.com/Di-ref/diref</a> repo</span></p>
        </footer>
      </div>
    );
  }
}

// ========================================

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// ========================================

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
);

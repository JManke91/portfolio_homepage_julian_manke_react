import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './portfoliogridentry.css';

/**
 * Creates a grid entry with photo and caption, which shows a blurred preview until the actual image has been loaded. Preserves the aspect ratio of photos.
 *
 * @class
 * @extends Component
 */
class PortfolioGridEntry extends Component {
  constructor(props) {
    super(props);

    this.imageUrl = props.imageUrl
    this.caption = props.caption

    this.state = {
      imgLoaded: false,
    }
  }

  render() {
    const { aspectRatio } = this.props;
    return (

      <div
        className="image-container" onClick={this.props.onClick}>
        <img onLoad={() => this.setState({
          imgLoaded: true
        })}
          className={this.state.imgLoaded ? 'image' : 'image blur'}
          src={this.imageUrl}
          style={{
            width: "100%",
            display: "block",
            //width: "95%",
            // borderRadius: "8px",
            aspectRatio: aspectRatio ? aspectRatio : undefined,
          }}
          alt={"Default caption"}
        />
        {this.state.imgLoaded && this.caption && <p>{this.caption}</p>}
      </div>
    );
  }
}

PortfolioGridEntry.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number, // Optional aspectRatio prop
};

export default PortfolioGridEntry;


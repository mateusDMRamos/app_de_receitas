import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ detailsPage, type, id, index }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = (url) => {
    if (detailsPage) {
      const urlDivisions = 5;
      const urlDivs = url.split('/', urlDivisions);
      const newUrl = (
        `${urlDivs[0]}/${urlDivs[1]}/${urlDivs[2]}/${urlDivs[3]}/${urlDivs[4]}`
      );
      setLinkCopied(true);
      copy(newUrl);
    } else {
      const urlDivisions = 3;
      const urlDivs = url.split('/', urlDivisions);
      copy(`${urlDivs[0]}/${urlDivs[1]}/${urlDivs[2]}/${type}s/${id}`);
      setLinkCopied(true);
    }
  };
  return (
    <div>
      { linkCopied ? <p>Link copied!</p> : ''}
      <button
        type="button"
        onClick={ () => { handleCopy(window.location.href); } }
      >
        <img
          src={ shareIcon }
          alt="share button"
          data-testid={ detailsPage ? 'share-btn' : `${index}-horizontal-share-btn` }
        />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  detailsPage: PropTypes.bool.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
};

ShareButton.defaultProps = {
  type: '',
  id: '',
  index: 0,
};

export default ShareButton;

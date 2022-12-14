import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = (url) => {
    const urlDivisions = 5;
    const urlDivs = url.split('/', urlDivisions);
    const newUrl = (
      `${urlDivs[0]}/${urlDivs[1]}/${urlDivs[2]}/${urlDivs[3]}/${urlDivs[4]}`
    );
    setLinkCopied(true);
    copy(newUrl);
  };
  return (
    <div>
      { linkCopied ? <p>Link copied!</p> : ''}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => { handleCopy(window.location.href); } }
      >
        <img src={ shareIcon } alt="share button" />
      </button>
    </div>
  );
}

export default ShareButton;

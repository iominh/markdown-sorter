// var MarkdownIt = require('markdown-it'),
//     md = new MarkdownIt();

import React, { useState } from 'react';

import styles from './MarkdownComponent.module.scss';

const example1 = `# banana
This should be sorted second

# apple
This will be sorted first

and

should include multiple lines
`;

const example2 = `# banana
This should be sorted second

# apple
This will be sorted first

and

should include multiple lines

## apple header2

This header 2 subtext for example should be included as part of apple
`;


const sortMarkdownTextByHeaders = (text: string, regexp: RegExp, sortAscending = true, ) => {
    let sortedText = '';
    // const regexp =;
    // const regexp = new RegExp(/(# .*)?=\n.*?=|$)/gim)
    const matches = text.match(regexp);

    console.log(matches);

    const sortedMatches = matches?.sort((a, b) => {
      return a.toString().localeCompare(b.toLocaleLowerCase());
    });

    sortedMatches?.forEach((m, i) => {
      sortedText += `${m}${ i !== m.length ? '\n' : ''}`;
    })

    return sortedText;
}


const MarkdownComponent = () => {
  const [state, setState] = useState({
      text: '',
      sortedText: '',
      regexp: /#[\s\S]*?(?=\n.*?#|$)/g
  });

  const updateText = (text: string) => {
    setState({ ...state, text, sortedText: sortMarkdownTextByHeaders(text, state.regexp) });
  }

  const updateRegexp = (regexp: RegExp) => {
    setState({ ...state, regexp, sortedText: sortMarkdownTextByHeaders(state.text, regexp) });
  }

  return (
    <main className={styles.main}>
      <div>Enter markdown with headers in this textarea and it will sort below</div>

      <textarea value={state.text} onChange={(e) => updateText(e.target.value)} />
      <div>
          Sorted Markdown
      </div>
      <textarea readOnly value={state.sortedText}></textarea>

      {/* <div>For more control in sorting, update the <a href="https://regex101.com/r/QqCEqA/1" target="_blank">regular expression</a></div>
      <input value={String(state.regexp)} onChange={(e) => updateRegexp(new RegExp(e.target.value))} /> */}

      <div>Simple example to try out</div>
      <textarea readOnly value={example1}></textarea>

      <div>The following example will be supported in the future</div>
      <textarea readOnly value={example2}></textarea>
    </main>
  );
};

export default MarkdownComponent;

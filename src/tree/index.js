import React from 'react';
import './index.css'
import data from './data.json'

export default function Tree() {

  /**
   * Parse animal data from data.json and generate HTML elements with the
   * appropriate indentation for each animal. The data in the json file is formatted
   * where the key is the name of the animal and the value is its indentation level.
   * @returns HTML including all animals with the proper styling for each animal
   */
  const buildTree = () => {
    const elements = [];

    for (const animalType in data) {
      const animals = data[animalType]

      for (const [animal, column] of Object.entries(animals)) {
        elements.push(
        <div key={animal} style={{textIndent: `${column}em`}}>
          {animal}
        </div>)
      }
    }

    return elements;
  };

  return (
    <div className="tree">
      mammals<br/>
      {buildTree()}
    </div>
  )
}

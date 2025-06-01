import React, { useState } from 'react';
import './index.css'
import data from './data.json'

export default function Tree() {
  const [animalData, setAnimalData] = useState(data);

  const addAnimal = (parentAnimal, newAnimal) => {
    // ignore blank inputs
    if (!newAnimal.trim()) {
      return;
    }

    const updatedAnimalData = { ...animalData };

    // add new animal as child to the parent animal
    if (parentAnimal !== 'mammals') {
      updatedAnimalData['mammals'][parentAnimal]['children'].push(newAnimal);

      // add new animal to the dataset with proper indentation & parent animal
      const newAnimalObject = new Object();
      const indentation = animalData['mammals'][parentAnimal]['indent'];
      newAnimalObject.indent = indentation + 3; // set the nested indent
      newAnimalObject.parent = [parentAnimal];
      newAnimalObject.children = [];

      // update the animal data object with new animal data
      updatedAnimalData.mammals[newAnimal] = newAnimalObject;
      setAnimalData(updatedAnimalData);
    } else { // if adding new animal to mammals, set default values of no children/parents and 3 indentation
      const newAnimalObject = new Object();
      newAnimalObject.indent = 3;
      newAnimalObject.parent = [];
      newAnimalObject.children = [];

      // update the animal data object with new animal data
      updatedAnimalData.mammals[newAnimal] = newAnimalObject;
      setAnimalData(updatedAnimalData);
    }

    console.log(animalData);
  }

  const handleEnterKey = (e, parentAnimal) => {
    if (e.key === 'Enter') {
      addAnimal(parentAnimal, e.target.value);
      e.target.value = ''; // clear the input after hitting enter
    }
  };

  /**
   * Parse animal data from data.json and generate HTML elements with the
   * appropriate indentation for each animal. The data in the json file is structured
   * where we store the indentation level of each animal along with the parent and
   * child node of each animal
   * @returns HTML including all animals with the proper styling for each animal
   */
  const buildTree = () => {
    const elements = [];

    for (const animalType in animalData) {
      const animals = animalData[animalType]
      elements.push(
        <div key={animalType}>
          {animalType}
          <input
              type="text"
              onKeyDown={ e => handleEnterKey(e, animalType)}
            />
        </div>)

      // render the tree animals in accordance to their parent/children node structure
      for (const [animal, animalMap] of Object.entries(animals)) {
        // if animal has no parent, render the animal
        if (animalMap.parent.length === 0){
          elements.push(
              <div key={animal} style={{textIndent: `${animalMap.indent}em`}}>
                {animal}
              <input
                  type="text"
                  onKeyDown={ e => handleEnterKey(e, animal)}
                />
              </div>
            )

            // render this animal's children if it has any
            if (animalMap.children.length !== 0) {
              for (const childAnimal of animalMap.children) {
                elements.push(
                  <div key={childAnimal} style={{textIndent: `${animals[childAnimal].indent}em`}}>
                    {childAnimal}
                  <input
                      type="text"
                      onKeyDown={ e => handleEnterKey(e, childAnimal)}
                    />
                  </div>
                  )
                }
              }
        // if animal has a parent, don't render the animal as it has already been rendered
        // by the parent. render the current animal's children if it has any
        } else {
          if (animalMap.children.length !== 0) {
              for (const childAnimal of animalMap.children) {
                elements.push(
                  <div key={childAnimal} style={{textIndent: `${animals[childAnimal].indent}em`}}>
                    {childAnimal}
                  <input
                      type="text"
                      onKeyDown={ e => handleEnterKey(e, childAnimal)}
                    />
                  </div>
                  )
                }
              }
          }
        }
      }
      return elements;
    }

    return (
      <div className="tree">
        {buildTree()}
      </div>
    )
  };

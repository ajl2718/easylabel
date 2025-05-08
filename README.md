# easylabel

A prototype application that allows a user to load a list of text files and label each as belonging to a set of binary classes. The results are then exported as a json file that be combined with the texts to form a labelled training dataset for ML model training and validation.

## How to use it
The file `script.js` contains a list of yes/no questions that the user is asked. These can be modified to a specific application. Currently only binary questions are supported.

To run the application simply load the `index.html` file in a browser. You can then load a list of text files and start labelling.

## To do
- Clean up the interface
- Allow for labelling with more than two categories.
- Make the interface nicer
- Increase the number of labelling tasks, e.g., NER.
- Visualise and modify prompts for LLMs
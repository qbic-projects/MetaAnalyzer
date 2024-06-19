> [!WARNING] 
> The MetaAnalyzer is still under development.

# MetaAnalyzer: Aggregation Method
To be able to submit data to the DZIF microbial OMICs database with human-derived metadata, fill out the suiting metadata scheme and aggregate the data in the way described in this section. The MetaAnalyzer is a tool to perform such an aggregation, but comes without warranty of any kind (see [License](License)).

General requirements:
- The number of samples has to be greater than 25. Otherwise the metadata cannot be used by the DZIF microbial OMICs DB.
- If the percentage of entries of a certain category of a metadata field where amount of entries per category is reported is below 10% of the sample number, only the categories are allowed to be reported (unique values).

## Median, average, standard deviation, Q25 and Q75
For the columns `Host height`, `Host weight` and `Age` the median, average, standard deviation, Q25 and Q75 have to be calculated.

## Unique values
For the columns `Chemical exposure`, `Collected by` and `Disorders` unique values have to be reported.

## Time span
For the column `Collection date` the time span of the sample acquisition has to be calculated.

## Amount of samples per category
As stated above, for these metadata columns the amount of each category has to be above 10% of the amount of samples. If this criterium is met, the amount of samples per category has to be calculated. Following columns are to be aggregated in this way: `Country`, `State`, `Host diet`, `Phenotypical antimicrobial resistance`, `Sample material`, `Sample site/feature` and `Sex`.

## Species
For species only _Homo sapiens_ is allowed to be listed. For data in from another species in the same study, make a separate submission using the suiting non-human host metadata scheme.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

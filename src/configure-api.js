import API, { graphqlOperation } from '@aws-amplify/api'
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

function configure() {
    Amplify.configure(awsconfig);
    API.configure(awsconfig);
}

export default configure;


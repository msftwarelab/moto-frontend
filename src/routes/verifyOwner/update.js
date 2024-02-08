// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Locale
import messages from '../../locale/messages';


// Redux Action
import { getListingData } from '../../actions/getListing';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';
import { toastr } from 'react-redux-toastr';
import { getUserCompany } from '../../actions/getUserCompany';

const query =  `
mutation CreateCompany($name: String!, $email: String!, $phone: String!, $line: String!, $address: String!, $isCompany: Boolean!) {
    CreateCompany(name: $name, email: $email, phone: $phone, line: $line, address: $address, isCompany: $isCompany) {
        id,
        name,
        email,
        phone,
        line,
        address,
        isCompany,
        userId
    }
}
`;

async function update(values, dispatch) {
    console.log(`DEBUG`, values);


    dispatch(setLoaderStart('updateListing'));

    const variables = {
        ...values,
        line: values.line || '',
        isCompany: values.companyType === "Company"
    };

    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        }),
        credentials: 'include'
    });

    const { data } = await resp.json();

    if (data.CreateCompany) {
        dispatch(getUserCompany());
        history.push('/become-a-owner');

    } else {
        toastr.error('error!', 'The data which you have selected is not available. Please try again');
    }
    // if (data.updateListing.status == "success") {
    //     await dispatch(manageListingSteps(values.id, 1));
    //     history.push('/become-a-owner/' + values.id + '/home');
    //     await dispatch(setLoaderComplete('updateListing'));
    //     await dispatch(getListingData(values.id));
    //     await dispatch(getListingFieldsValues("2", values.id));
    // } else if (data.updateListing.status == "notLoggedIn") {
    //     dispatch(setLoaderComplete('updateListing'));
    //     throw new SubmissionError({ _error: messages.notLoggedIn });
    // } else if (data.updateListing.status == "unSuccess") {
    //     toastr.error('error!', 'The data which you have selected is not available. Please try again');
    //     dispatch(setLoaderComplete('updateListing'));
    //     dispatch(getListingFields())
    // } else {
    //     dispatch(setLoaderComplete('updateListing'));
    //     throw new SubmissionError({ _error: messages.somethingWentWrong });
    // }

}

export default update;

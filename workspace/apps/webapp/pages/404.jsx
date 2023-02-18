import PageNotFound from '../Components/Common/PageNotFound';

export default function Custom404() {

    return (

        <PageNotFound
            heading="404 - Page Not Found"
            redirectionLink="/"
            redirectionText="Go to Home page"
        />
    );
}
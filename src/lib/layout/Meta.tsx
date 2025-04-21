import { Helmet } from 'react-helmet';

const APP_NAME = 'Wayst Recycling';

const Meta = () => {
  return (
    <Helmet>
      <title>Wayst Recycling</title>
      <meta
        name="description"
        content="Schedule waste pickups or drop off recyclables with ease, earn cUSD rewards instantly, and build a greener future—one action at a time"
      />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/assets/favicon.svg" />
    </Helmet>
  );
};

export default Meta;

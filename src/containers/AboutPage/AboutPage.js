import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.module.css';
import image from './about-us-1056.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About LocalFishingGuide',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>The FIRST Marketplace for Freshwater Fishing Guides</h1>
          <img className={css.coverImage} src="static/images/find-a-local-fishing-guide.jpg" />

          <div className={css.contentWrapper}>
            <div className={css.contentMain}>
              <section>
                <div id="learnMore" className="title">
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>
                    The <span className="underline italic">First</span> Marketplace for Freshwater
                    Fishing Guides
                  </h2>
                </div>
              </section>

              <section>
                <div class="title">
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>Trusted and Comprehensive</h2>
                  <nuxt-link to="/user/sign_up">
                    <button size="large" color="orange">
                      Sign up now
                    </button>
                  </nuxt-link>
                </div>

                <p>
                  Our site simplifies your marketing with a low-cost advertising, booking, calendar
                  management, customer review, and promotional platform. Not intended to replace
                  your website, LocalFishingGuide complements your online presence by connecting you
                  with potential customers around the world. In today’s digital world, anglers need
                  a trusted, authoritative source of information and advice about which guides will
                  make their next expedition a memorable one. They surf the web for testimonials,
                  photos, and reviews, but until the arrival of LocalFishingGuide they have been
                  unable to find the information they needed in one spot.
                </p>
              </section>

              <section id="simpleAndAffordable">
                <div class="title">
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>Simple and Affordable</h2>
                </div>
                <p>
                  LocalFishingGuide makes it easy to generate more business in less time. We help
                  you stand out from the competition. A listing on our site tells clients that you
                  adhere to the strictest ethics and safety protocols and provides an implicit
                  endorsement of your services. Here are the reasons to sign up today:
                </p>
                <div class="flex space-between">
                  <div class="cardList">
                    <img src="static/images/treble-hook.pnge alt='Trebel Hook Icon'.svg" />
                    <p>Easy to set up and update, giving you more time on the water</p>
                  </div>
                  <div class="cardList">
                    <img src="static/images/treble-hook.pngg alt='Trebel Hook Icon'" />
                    <p>
                      Wide exposure to potential customers who increasing go online to research
                      fishing trips
                    </p>
                  </div>
                  <div class="cardList">
                    <img src="static/images/treble-hook.png. alt='Trebel Hook Icon'svg" />
                    <p>Highly targeted, low-cost referral prospects</p>
                  </div>
                  <div class="cardList">
                    <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                    <p>Professional appearance and attentive administration</p>
                  </div>
                </div>
              </section>

              <section id="howItWorks">
                <div class="title">
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>How it Works</h2>
                  <nuxt-link to="/user/sign_up">
                    <button size="large" color="orange">
                      Sign up now
                    </button>
                  </nuxt-link>
                </div>
                <p>
                  Currently in beta with a launch date of December 2020, LocalFishingGuide will
                  allow you to create a business profile along with all the details of the trips you
                  provide: lakes, rivers, and streams you cover, pricing, availability, and what’s
                  included. You can also upload customer reviews, and photos of full stringers and
                  packed live wells as testament to your skill.
                </p>
                <p>
                  Anglers planning trips to your region cannot only read your pitch and
                  testimonials, they also can enter the trip features and price range they desire in
                  order to create the one-of-a-kind trip they are looking for. Whether it’s a family
                  vacation, a unique bachelorette party activity, or an opportunity to commune with
                  nature’s beauty, LocalFishingGuide will connect you with the clients seeking the
                  types of outings you provide.
                </p>

                <p>
                  Once the site becomes live, you can start booking fishing adventures through our
                  three-step process:
                </p>

                <div class="flex space-between mt-16">
                  <img
                    class="howItWorks mr-4"
                    src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-1.png"
                  />
                  <p>
                    Provide as much detail in your LocalFishingGuide listing as possible. The more
                    details your tout, the more precise the customer matches and the more qualified
                    the prospects. You spend time cultivating only the shoppers most likely to
                    convert to buyers.
                  </p>
                </div>
                <div class="flex space-between mt-16">
                  <p>
                    LocalFishingGuide spreads the word. Our site is search-engine optimized to rank
                    high in Google results for the keywords your customers search for. We promote
                    our listings on other relevant websites and through an aggressive marketing
                    program. You provide the service, we provide the customers.
                  </p>
                  <img
                    class="howItWorks ml-16"
                    src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-2.png"
                  />
                </div>
                <div class="flex space-between mt-8">
                  <img
                    class="howItWorks mr-4"
                    src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-3.png"
                  />
                  <p>
                    The requests roll in. We start sending you referrals from anglers interested in
                    the kinds of adventures you offer. You can determine how many referrals you want
                    to receive each month in order to stay within your budget.
                  </p>
                </div>
                <div class="flex space-between">
                  <div class="cardList">
                    <img src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-1.png" />
                    <p>
                      Provide as much detail in your LocalFishingGuide listing as possible. The more
                      details your tout, the more precise the customer matches and the more
                      qualified the prospects. You spend time cultivating only the shoppers most
                      likely to convert to buyers.
                    </p>
                  </div>
                  <div class="cardList">
                    <img src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-2.png" />
                    <p>
                      LocalFishingGuide spreads the word. Our site is search-engine optimized to
                      rank high in Google results for the keywords your customers search for. We
                      promote our listings on other relevant websites and through an aggressive
                      marketing program. You provide the service, we provide the customers.
                    </p>
                  </div>
                  <div class="cardList">
                    <img src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-2.png" />
                    <p>
                      The requests roll in. We start sending you referrals from anglers interested
                      in the kinds of adventures you offer. You can determine how many referrals you
                      want to receive each month in order to stay within your budget.
                    </p>
                  </div>
                </div>
              </section>

              <section id="firstThingsFirst">
                <div class="title">
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>First Things First</h2>
                </div>
                <p>
                  In order to offer anglers our valuable service from the get-go, we need to launch
                  with several listings from top-notch fishing guides like you. To sweeten the deal,
                  LocalFishingGuide is offering charter members a host of free amenities. By joining
                  the site now, you not only get in on the ground floor and secure your place as one
                  of the first guide services to receive referrals, but you can also secure your
                  first clients for free. Just for signing up during our pre-launch period, you will
                  receive:
                </p>
                <ul>
                  <li>A life time 10% discount on all transactions</li>
                  <li>Seven free client referrals (will go down to three after launch)</li>
                  <li>Guaranteed premium placement for the first three months after launch.</li>
                </ul>
                <p>
                  To get all this and secure your place as a LocalFishingGuide charter member,
                  simply click the "Sign up now" button below.
                </p>
                <nuxt-link to="/user/sign_up">
                  <button size="large" color="orange" class="mx-auto mt-8">
                    Sign up now
                  </button>
                </nuxt-link>
              </section>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;

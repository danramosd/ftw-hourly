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
  LayoutWrapperMainFullWidth,
  OrangeButton,
  NamedLink,
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
        <LayoutWrapperMainFullWidth>
          <div className={css.heroWrapper}>
            <p>
              <h1 className={css.pageTitle}>Let's Go Fishing</h1>
              <h2>
                You may be a fish whisperer, but hooking customers requires a much more subtle
                approach
              </h2>
              <OrangeButton className={css.button}>
                <NamedLink name="SignupPage">Sign up now</NamedLink>
              </OrangeButton>
            </p>
            {/* <img className={css.coverImage} src="static/images/find-a-local-fishing-guide.jpg" /> */}
          </div>
        </LayoutWrapperMainFullWidth>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={css.contentWrapper} id="learnMore">
            <div className={css.contentMain}>
              <section>
                <div className={css.sectionTitle}>
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>
                    The <span className={css.emph}>First</span> Marketplace for Freshwater Fishing
                    Guides
                  </h2>
                </div>
                <div className={css.flex}>
                  <div>
                    <p>
                      No matter how extensive your expertise at tracking trout, pinpointing perch,
                      and stalking stripers, catching the attention of anglers requires an entirely
                      different skillset.
                    </p>
                    <p>
                      As a savvy small-business owner, you know you have to chum the water with
                      marketing dollars to attract the right type of client for your fishing guide
                      service. But keeping your website current, posting to Facebook, tweeting
                      special offers, and adding photos to Instagram cost real money and requires
                      time better spent on the water.
                    </p>
                    <p>
                      Website marketing and social media are important, but for your guide service
                      to really succeed, you need a platform that shines a wider, brighter spotlight
                      on your offerings.
                    </p>
                    <p>
                      That’s where we come in. Consider LocalFishingGuide your tacklebox, full of
                      strategies for luring customers and booking more trips. We’re an innovative
                      referral website that matches avid fishers to guides whose knowledge of local
                      waterways can put them on the lunkers of their dreams. We’re a low-cost,
                      all-inclusive solution to your marketing needs. LocalFishingGuide focuses
                      exclusively on fishing guides and outfitters serving the Rocky Mountain,
                      Desert Southwest, and Great Lakes regions. We tailor our guide listing and
                      referral service to match your ideal customer persona and your marketing
                      budget. As avid outdoorspeople, we understand what customers want from the
                      fishing trips we book. Your listing on LocalFishingGuide showcases your
                      service and your dedication to delivering productive fishing trips.
                    </p>
                  </div>
                  <img
                    width="350"
                    src="/static/images/fly-fishing-utah.jpg"
                    alt="Fly Fishing Guides Utah"
                  />
                </div>
              </section>

              <section>
                <div className={css.sectionTitle}>
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>Trusted and Comprehensive</h2>

                  <OrangeButton className={css.button}>
                    <NamedLink name="SignupPage">Sign up now</NamedLink>
                  </OrangeButton>
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

              <section className={css.simpleAndAffordable}>
                <div className={css.sectionTitle}>
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>Simple and Affordable</h2>
                </div>
                <p>
                  LocalFishingGuide makes it easy to generate more business in less time. We help
                  you stand out from the competition. A listing on our site tells clients that you
                  adhere to the strictest ethics and safety protocols and provides an implicit
                  endorsement of your services. Here are the reasons to sign up today:
                </p>
                <div className={css.cardListWrapper}>
                  <div className={css.cardList}>
                    <img src="static/icons/checkmark-outline.svg" />
                    <p>Easy to set up and update, giving you more time on the water</p>
                  </div>
                  <div className={css.cardList}>
                    <img src="static/icons/brightness-up.svg" />
                    <p>
                      Wide exposure to potential customers who increasing go online to research
                      fishing trips
                    </p>
                  </div>
                  <div className={css.cardList}>
                    <img src="static/icons/location-current.svg" />
                    <p>Highly targeted, low-cost referral prospects</p>
                  </div>
                  <div className={css.cardList}>
                    <img src="static/icons/view-show.svg" />
                    <p>Professional appearance and attentive administration</p>
                  </div>
                </div>
              </section>

              <section className={css.howItWorks}>
                <div className={css.sectionTitle}>
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>How it Works</h2>
                  <OrangeButton className={css.button}>
                    <NamedLink name="SignupPage">Sign up now</NamedLink>
                  </OrangeButton>
                </div>
                <p>
                  LocalFishingGuide allows you to create a business profile along with all the
                  details of the trips you provide: lakes, rivers, and streams you cover, pricing,
                  availability, and what’s included. You can also upload customer reviews, and
                  photos of full stringers and packed live wells as testament to your skill.
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

                <div className={css.flex}>
                  <img
                    class="howItWorks ml-16"
                    src="static/images/find-a-local-fishing-guide.png"
                    alt="Find a local local fishing guide near me - LocalFishingGuide.com"
                  />
                  <p>
                    Provide as much detail in your LocalFishingGuide listing as possible. The more
                    details your tout, the more precise the customer matches and the more qualified
                    the prospects. You spend time cultivating only the shoppers most likely to
                    convert to buyers.
                  </p>
                </div>
                <div className={css.flex}>
                  <p>
                    LocalFishingGuide spreads the word. Our site is search-engine optimized to rank
                    high in Google results for the keywords your customers search for. We promote
                    our listings on other relevant websites and through an aggressive marketing
                    program. You provide the service, we provide the customers.
                  </p>
                  <img
                    class="howItWorks mr-4"
                    src="static/images/local-fishing-guide-how-it-works.png"
                    alt="Local fishing guides near me - screenshot1"
                  />
                </div>
                <div className={css.flex}>
                  <img
                    class="howItWorks mr-4"
                    src="static/images/fishing-guides-utah-and-idaho.png"
                    alt="Fishing guides in Utah and Idaho"
                  />
                  <p>
                    The requests roll in. We start sending you referrals from anglers interested in
                    the kinds of adventures you offer. You can determine how many referrals you want
                    to receive each month in order to stay within your budget.
                  </p>
                </div>
              </section>

              <section>
                <div className={css.sectionTitle}>
                  <img src="static/images/treble-hook.png" alt="Trebel Hook Icon" />
                  <h2>How Much Does it Cost?</h2>
                </div>
                {/* <p>
                  With fishing being a seasonal business in some regions, we wanted to make sure
                  LocalFishingGuide puts our guides first. Our pricing is affordable and straight
                  forward - 15% on all transactions INCLUDING credit card processing fees. In order
                  to offer anglers our valuable service from the get-go, we need to launch with
                  several listings in each region from top-notch fishing guides like you.
                </p> */}
                <p>
                  Listing your business is 100% free with no monthly or hidden fees. Our pricing
                  structure is affordable and straight forward - 15% for all transactions INCLUDING
                  credit card processing fees.
                </p>
                <h3>List your business today!</h3>
                <OrangeButton className={css.button}>
                  <NamedLink name="SignupPage">Sign up now</NamedLink>
                </OrangeButton>
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

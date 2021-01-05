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
                <a href="#learnMore">Learn More</a>
              </OrangeButton>
            </p>
            <img className={css.coverImage} src="static/images/find-a-local-fishing-guide.jpg" />
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
                  <NamedLink name="SignupPage">
                    <OrangeButton className={css.button}>Sign up now</OrangeButton>
                  </NamedLink>
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
                  <NamedLink name="SignupPage">
                    <OrangeButton className={css.button}>Sign up now</OrangeButton>
                  </NamedLink>
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

                <div className={css.flex}>
                  <img
                    class="howItWorks mr-4"
                    src="static/images/local-fishing-guide-how-it-works.png"
                    alt="Local fishing guides near me - screenshot1"
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
                  <div className={css.cardList}>
                    <img src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-1.png" />
                    <p>
                      Provide as much detail in your LocalFishingGuide listing as possible. The more
                      details your tout, the more precise the customer matches and the more
                      qualified the prospects. You spend time cultivating only the shoppers most
                      likely to convert to buyers.
                    </p>
                  </div>
                  <div className={css.cardList}>
                    <img src="static/images/treble-hook.pngd alt='Trebel Hook Icon'e-how-it-works-2.png" />
                    <p>
                      LocalFishingGuide spreads the word. Our site is search-engine optimized to
                      rank high in Google results for the keywords your customers search for. We
                      promote our listings on other relevant websites and through an aggressive
                      marketing program. You provide the service, we provide the customers.
                    </p>
                  </div>
                  <div className={css.cardList}>
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
                <div className={css.sectionTitle}>
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
                <NamedLink name="SignupPage">
                  <OrangeButton className={css.button}>Sign up now</OrangeButton>
                </NamedLink>
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

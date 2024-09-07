import { useAuth0 } from '@auth0/auth0-react'

import { useTranslation } from 'react-i18next'

import { useState, useEffect, React } from 'react'

import Navbar from 'components/navbar'

import Button from 'shared/button'

import { withLDConsumer } from 'launchdarkly-react-client-sdk'

import { Styledh1, Styledp } from '../../styles/styledComponents/containers'

import { RightSideButtonContainer } from '../pages/new-request/step1/step1.styled'

function Container({ children, hasScroll, setIsDisabled }) {
  const handleScroll = (e) => {
    const bottom = Math.abs(
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) <= 1,
    )
    if (bottom) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          overflowY: 'scroll',
          paddingLeft: '256px',
          paddingRight: '256px',
          height: '80vh',
        }}
        onScroll={hasScroll ? handleScroll : null}
      >
        {children}
      </div>
    </div>
  )
}

function TermsAcceptance({ flags }) {
  const { logout } = useAuth0()
  const { t } = useTranslation()
  const [isDisabled, setIsDisabled] = useState(null)
  const searchParams = new URLSearchParams(document.location.search)
  const state = searchParams.get('state')

  const [continueUrl] = useState(
    `https://${process.env.AUTH0_DOMAIN}/continue?state=${state}`,
  )

  // useEffect(() => {
  //   if (flags.vitalCpTermsScrollRequired) {
  //     setIsDisabled(true)
  //   } else {
  //     setIsDisabled(false)
  //   }
  // }, [flags.vitalCpTermsScrollRequired])

  return (
    <>
      <Navbar />

      <Container
        hasScroll={flags.vitalCpTermsScrollRequired}
        setIsDisabled={setIsDisabled}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginBottom: '90px',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              border: '1px solid rgba(4, 8, 9, 0.08)',
              borderRadius: '99px',
              padding: '8px 24px',
              width: 'fit-content',
              marginTop: '60px',
            }}
          >
            November 29, 2022
          </div>

          <div
            style={{
              color: 'black',
              fontSize: '71px',
              fontWeight: '700',
            }}
          >
            Terms of Service
          </div>

          <div
            style={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: '34px',
              fontWeight: '400',
            }}
          >
            By creating a Sorenson account you agree to be bound by our Terms of
            Service.
          </div>
        </div>

        <div>
          <h1
            style={{
              color: 'black',
              textAlign: 'left',
              textIndent: '0pt',
              fontSize: '27px',
              fontWeight: '700',
            }}
          >
            Sorenson Communications,
          </h1>
          <h1
            style={{
              color: 'black',
              textAlign: 'left',
              textIndent: '0pt',
              fontSize: '27px',
              fontWeight: '700',
            }}
          >
            LLC END USER LICENSE AGREEMENT
          </h1>
          <br />
          <div
            style={{
              color: 'black',
              textAlign: 'left',
              textIndent: '0pt',
              fontSize: '27px',
              fontWeight: '700',
            }}
          >
            Terms, Conditions & Acceptable Use Policies
          </div>
          <br />
          <p
            style={{
              textAlign: 'left',
              fontSize: '21px',
            }}
          >
            Governing Language. The English language version of this agreement
            shall be controlling in all respects, notwithstanding any
            translation of this agreement made for any purpose whatsoever. If
            any translation of this agreement conflicts with the English version
            or contains terms in addition to or different from the English
            version, the English version shall prevail<b>.</b>
          </p>
          <br />
          <Styledh1>Effective Date: November 29, 2022</Styledh1>
          <br />
          <Styledp>
            These Terms and Conditions ("Terms and Conditions") form a legal
            agreement between SORENSON COMMUNICATIONS, LLC. and you, the
            individual ("you" and "your") concerning your access to and use of
            the various services offered through the Websites and the Platforms
            (as defined below). Use of any of the Websites or Platforms
            constitutes your acceptance of these Terms and Conditions and our
            Privacy Policy and applicable Privacy Notice, which can be accessed
            at{' '}
            <a
              href="https://www.sorenson.com/interpreting-services/legal/"
              class="a"
              target="_blank"
            >
              https://www.sorenson.com/interpreting-services/legal/
            </a>
          </Styledp>
          <br />
          <Styledp>
            Sorenson Communications, LLC on its own behalf and on behalf of its
            affiliates and/or wholly owned subsidiaries including but not
            limited to CaptionCall, LLC and Sign Language Interactions Ltd
            (collectively referred to as "Sorenson", "we", "us", or "our"),
            Sorenson makes certain video remote interpreting (“VRI”),
            captioning, and communication access real-time translation (CART)
            services available to you (collectively, the "Services"). Sorenson
            owns and operates various publicly available websites, including
            without limitation,{' '}
            <a href="http://www.sorenson.com/" class="a" target="_blank">
              www.sorenson.com
            </a>
            ,{' '}
            <a href="http://www.captioncall.com/" class="s1" target="_blank">
              www.captioncall.com
            </a>
            , and{' '}
            <a
              href="http://www.signlanguageinteractions.com/"
              class="a"
              target="_blank"
            >
              www.signlanguageinteractions.com
            </a>{' '}
            (collectively, "Websites") and various web-based, add-in, connector,
            mobile, or other software applications, including without limitation
            applications you download from the Microsoft Office Store or acquire
            from within the settings of a Microsoft Office product, or
            applications such as Google Meet, Webex, or Zoom (collectively,
            "Platforms").
          </Styledp>
          <br />
          <Styledh1>
            BY USING THE WEBSITES AND/OR THE PLATFORMS, YOU EXPRESSLY AGREE TO
            THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE TO THESE TERMS AND
            CONDITIONS, YOU SHOULD IMMEDIATELY CEASE ALL USE OF AND ACCESS TO
            ALL OF THE WEBSITES AND PLATFORMS. PLEASE PRINT A COPY OF THESE
            TERMS AND CONDITIONS FOR YOUR RECORDS.
          </Styledh1>
          <br />
          <Styledh1>Modifications to these Terms and Conditions</Styledh1>
          <br />
          <Styledp>
            Sorenson may in its sole discretion, without prior notice to you,
            revise these Terms and Conditions at any time. Should these Terms
            and Conditions change materially, Sorenson will update the Effective
            Date noted above and post a notice regarding the updated Terms and
            Conditions on the Websites. The amended Terms and Conditions will
            also appear when the Platforms are accessed by you and you will need
            to acknowledge your agreement to the amended Terms and Conditions
            prior to being able to continue to use the Platforms. If you do not
            agree to the terms of the amended Terms and Conditions, your sole
            and exclusive remedy is to discontinue your use of the Websites and
            Platforms and you will be deemed to have terminated these Terms and
            Conditions. Amended Terms and Conditions will be effective as of the
            Effective Date unless otherwise stated. By accessing or using the
            Websites and the Platforms after such changes are posted you agree
            and consent to all such changes.
          </Styledp>
          <br />
          <Styledh1>Access to the Platforms</Styledh1>
          <br />
          <Styledp>
            You may access and use the Platforms via remote access connectivity.
            Sorenson grants you a limited, non-exclusive, non-sublicensable,
            revocable, non-transferable license to use the Platforms in
            accordance with these Terms and Conditions. In order to use the
            Platforms, you may be asked to register an account and create login
            information, including without limitation, username and passwords.
            You must safeguard your login information that you use to access the
            Platforms and you must not disclose this information to anyone. You
            must immediately notify Sorenson of any unauthorized use of your
            user account or of any other breach of security that you become
            aware of involving and relating to the Platforms by email to
            privacy@sorenson.com.
          </Styledp>
          <br />
          <Styledh1>Your Representations and Warranties</Styledh1>
          <br />
          <Styledp>
            By using or registering on the Platforms, you represent and warrant
            the following: (i) you are at least eighteen (18) years of age, (ii)
            you are accessing the Websites and Platforms for yourself or a child
            under the age of eighteen for whom you are the legal guardian, (iii)
            you have the legal ability and authority to enter into these Terms
            and Conditions with Sorenson, (iii) the information you have
            provided to Sorenson in any registration is accurate and complete,
            (iv) you will comply with any and all laws applicable to your use of
            the Websites and Platforms, (v) you will not interfere with a third
            party's use and enjoyment of the Websites and Platforms, (vi) you
            will not interfere with or disrupt Sorenson's or its vendors'
            security measures, (vii) if any information you provide to Sorenson
            becomes inaccurate, incomplete or otherwise false or misleading, you
            will immediately notify Sorenson, (viii)
          </Styledp>
          <br />
          <Styledh1>Termination</Styledh1>
          <br />
          <Styledp>
            If you violate these Terms and Conditions, your ability to use the
            Websites and/or Platforms will be terminated. Sorenson may, in its
            sole discretion, terminate your access to the Websites and/or
            Platforms, or any portion thereof, for any reason whatsoever without
            prior notice. These actions are in addition to any other right or
            remedy Sorenson may have available at law. Further, Sorenson shall
            not be liable to you or any third party for any such termination or
            discontinuance. You may terminate these Terms and Conditions by
            ceasing to access and use the Websites and Platforms. Upon any
            termination of these Terms and Conditions you must immediately cease
            use of the Websites and Platforms. To the extent permitted by
            applicable law, the disclaimers, limitations on liability,
            termination and your warranties and indemnities shall survive any
            termination of these Terms and Conditions.
          </Styledp>
          <br />
          <Styledh1>User Obligations</Styledh1>
          <br />
          <Styledp>
            No Unlawful or Wrongful Use. You agree:
            <li style={{ marginTop: '5px' }}>
              to comply with all applicable laws with respect to the Websites
              and Platforms and Services;
            </li>
            <li style={{ marginTop: '5px' }}>
              not to engage or participate in communications or conduct of an
              abusive, pornographic, lewd, obscene, harassing, fraudulent, or
              unlawful nature while using the Websites and Platforms;
            </li>
            <li style={{ marginTop: '5px' }}>
              not to record, forward, post on the Internet, or transmit the
              voice, image, and/or likeness of any Sorenson employee in any way
              for any purpose, or to store, retrieve, use, or facilitate the use
              of, the voice, image, and/or likeness of the Sorenson employee in
              any way other than as necessary to permit the provision of
              Services;
            </li>
            <li style={{ marginTop: '5px' }}>
              not to use the Services in a way that interferes with Sorenson’s
              ability to provide VRI or point-to-point communications capability
              to you or other users and not to use the Platforms in a way that
              impinges on any other user or his or her enjoyment or use of the
              Services;
            </li>
            <li style={{ marginTop: '5px' }}>
              not to use the Hardware, Software, Sorenson’s VRS, or any of
              Sorenson’s systems or servers to infringe on any intellectual
              property rights, or other proprietary rights, including, but not
              limited to, trademark, copyright, patent, and trade-secret rights;
            </li>
            <li style={{ marginTop: '5px' }}>
              not to violate or breach in any way the security of Sorenson’s
              website, Sorenson’s networks, or any computer or device owned by
              Sorenson.
            </li>
            <br />
            Without limiting the foregoing, the following types of computer
            intrusions are prohibited: disseminating or planting viruses;
            causing a denial of service attack which interferes with access by
            authorized users; retrieving personal or proprietary information
            without authorization; or causing the transmission of any other
            program, information, code, or command that may damage the integrity
            or availability of data, a program, a system, or information. Any
            such intrusions may result in criminal or civil liability. Sorenson
            has the right to (1) discontinue or suspend, without advance notice,
            your use of the Hardware or Software or VRS for any reason or no
            reason, including if it becomes aware that you have breached the
            Agreement; (2) investigate a potential violation of any provision of
            the Agreement; (3) disclose to the full extent permitted by law any
            suspected use of the Websites and Platforms that Sorenson believes
            is unlawful or injurious to the rights, property, or safety of
            Sorenson, its employees, users, and/or members of the public; and
            (4) seek reimbursement and damages in the event of a violation of
            this Agreement.
          </Styledp>
          <br />
          <Styledh1>Privacy Matters</Styledh1>
          <br />
          <Styledp>
            You understand and hereby acknowledge that your use of the Platforms
            and Services may require your image and/or voice to be transmitted
            over the Internet. You further understand that due to the nature of
            the Internet and/or wireless communications, any privacy right,
            copyright, or other right or interest in your voice, image, or
            likeness may be lost with respect to any specific transmission as a
            result of such transmission. You authorize and specifically grant
            permission to Sorenson and any applicable third-party service
            providers to transmit your voice, likeness, and/or image over the
            Internet solely for the purpose of providing Services and
            point-to-point calls as needed, and you further release and agree to
            hold Sorenson harmless from any and all responsibility for any such
            loss of rights and/or interests resulting from transmission of your
            voice, likeness, and/or image over the Internet. The foregoing shall
            not be construed as consent to the use of your voice, likeness, or
            image for purposes other than delivery of Services.
          </Styledp>
          <br />
          <Styledh1>Intellectual Property Rights and Content</Styledh1>
          <br />
          <Styledp>
            Sorenson is the sole and exclusive owner of the Websites and
            Platforms, including any and all copyright, patent, trademark, trade
            secret and other ownership and intellectual property rights, in and
            to the Websites and Platforms and any related materials and
            documentation. No title or ownership of the Websites and Platforms
            or any portion thereof is transferred to you hereunder. Sorenson
            reserves all rights not expressly granted hereunder. You agree not
            to change or delete any copyright or proprietary notice related to
            materials downloaded from the Websites and/or Platforms.
          </Styledp>
          <br />
          <Styledh1>External links</Styledh1>
          <br />
          <Styledp>
            The Websites and Platforms may contain links to third-party
            websites. Linked sites are not under the control of Sorenson, and
            Sorenson is not responsible for the content of any linked site.
            Links are provided as a convenience only, and a link does not imply
            that Sorenson endorses, sponsors, or is affiliated with the linked
            site. Your use of third-party websites is at your own risk and
            subject to the terms and conditions of use for such sites; these
            Terms do not apply to other websites. Sorenson disclaims any and all
            liability for any information, including but without limitation, any
            medical and health treatment information set forth on linked sites.
          </Styledp>
          <br />
          <Styledh1>No Endorsements</Styledh1>
          <br />
          <Styledp>
            Reference to any product, recording, event, process, publication,
            service, or offering of any third party by name, trade name,
            trademark, service mark, company name or otherwise does not
            constitute or imply the endorsement or recommendation of such by
            Sorenson. Any views expressed by third parties on the Websites and
            Platforms are solely the views of such third party and Sorenson
            assumes no responsibility for the accuracy or veracity of any
            statement made by such third party.
          </Styledp>
          <br />
          <Styledh1>Indemnification and Limitation of Liability</Styledh1>
          <br />
          <Styledp>
            You agree to defend, indemnify and hold Sorenson, its officers,
            directors, employees, shareholders, affiliates, third-party
            contractors, agents, licensors and suppliers (each a Sorenson Party
            and collectively Sorenson Parties), harmless from and against any
            claims, actions or demands, losses, liabilities, damages, costs,
            expenses and settlements (including without limitation reasonable
            attorney and accounting fees), resulting from or alleged to result
            from, directly or indirectly, your (a) violation of these Terms and
            Conditions; (b) access to or use of the Platform and Websites; and
            (c) provision of other disclosure to Sorenson of any other
            information or data and the use of same by Sorenson or other
            Sorenson Party as contemplated hereunder.
          </Styledp>
          <br />
          <Styledp>
            IN NO EVENT SHALL SORENSON BE LIABLE FOR ANY DIRECT, INDIRECT,
            SPECIAL, PUNITIVE, INCIDENTAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES,
            OR ANY DAMAGES WHATSOEVER RESULTING FROM ANY LOSS OF USE, LOSS OF
            PROFITS, LITIGATION, OR ANY OTHER PECUNIARY LOSS, WHETHER BASED ON
            BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY,
            OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE
            WEBSITES OR PLATFORMS OR THE PROVISION OF OR FAILURE TO MAKE
            AVAILABLE ANY SUCH PRODUCTS, GOODS, OR SERVICES, EVEN IF ADVISED OF
            THE POSSIBILITY OF SUCH DAMAGES.
          </Styledp>
          <br />
          <Styledp>
            Sorenson shall not be liable for any failure to perform its
            obligations hereunder where the failure results from any cause
            beyond Sorenson's reasonable control, including, without limitation,
            mechanical, electronic, or communications failure or degradation.
          </Styledp>
          <br />
          <Styledp>
            The terms of these Terms and Conditions that limit liability reflect
            an informed voluntary allocation of risk; such allocation represents
            a material part of these Terms and Conditions. You agree that the
            limitations of liabilities set out in these Terms and Conditions are
            fair and reasonable in the circumstances.
          </Styledp>
          <br />
          <Styledh1>Disclaimer</Styledh1>
          <br />
          <Styledp>
            The Websites and Platforms are provided on an "as is" and "as
            available" basis and without warranties of any kind, either express
            or implied. To the fullest extent permissible pursuant to applicable
            law, Sorenson disclaims all representations, warranties, and
            conditions, express or implied, including, but not limited to,
            implied condition or warranties of merchantability and fitness for a
            particular purpose. Sorenson does not warrant that the Websites and
            Platforms will be uninterrupted or error-free, that defects will be
            corrected or that the Websites and Platforms or the server that
            makes it available are free of viruses or other harmful components.
          </Styledp>
          <br />
          <Styledp>
            Sorenson makes no guarantees and disclaims any implied warranty or
            representation about its accuracy, relevance, timeliness,
            completeness, or appropriateness of any content posted on the
            Website and Platforms for a particular purpose. Sorenson Heath
            assumes no liability arising from or relating to the delay, failure,
            interruption, or corruption of any data or other information
            transmitted in connection with use of the Websites and/or Platforms.
          </Styledp>
          <br />
          <Styledp>
            Applicable law may not allow the exclusion of implied warranties, so
            the above exclusion may not apply to you.
          </Styledp>
          <br />
          <Styledh1>Children</Styledh1>
          <br />
          <Styledp>
            The Websites and Platforms are not intended for children under the
            age of 13. If you are under 13 years of age, please do not use or
            access the Websites or Platforms at any time or in any manner. By
            using the Websites or Platforms, you affirm that you are over the
            age of 13. Sorenson does not seek through the Websites or Platforms
            to gather personal information from or about persons under the age
            of 13 without the consent of a parent or guardian.
          </Styledp>
          <br />
          <Styledh1>Dispute Resolution and Governing Law</Styledh1>
          <br />
          <Styledp>
            This Section provides for resolution of Disputes through final and
            binding arbitration before a neutral arbitrator instead of in a
            court by a judge or jury or through a class action. You may continue
            to have certain rights to obtain relief in small claims court or
            from a federal or state regulatory agency.
          </Styledp>
          <br />
          <Styledh1>Binding Arbitration</Styledh1>
          <br />
          <Styledp>
            You and we agree to resolve all disputes through individual binding
            arbitration or in small claims court, instead of courts of general
            jurisdiction. The arbitration will be conducted by one arbitrator
            using the procedures described by this Section. The arbitration will
            take place in Salt Lake City, Utah, or if you elect, in your County
            of residence.
          </Styledp>
          <br />
          <Styledp>
            The arbitration shall be administered by JAMS pursuant to the
            Comprehensive Arbitration Rules and Procedures and in accordance
            with the Expedited Procedures in those rules. If no disputed claim
            or counterclaim exceeds $250,000, not including interest or
            attorneys fees, the arbitration shall be administered under the JAMS
            Streamlined Arbitration Rules and Procedures as modified by this
            Agreement. Judgment on the Award may be entered in any court having
            jurisdiction. Notwithstanding any JAMS rule to the contrary or any
            other provision in arbitration rules chosen by agreement, we each
            agree that all issues regarding the Dispute are delegated to the
            arbitrator to decide, including any disagreements regarding the
            scope and enforceability of this agreement to arbitrate. In
            conducting the arbitration and making any award, the arbitrator
            shall be bound by and strictly enforce the terms of this Agreement
            and may not limit, expand, or otherwise modify its terms.
          </Styledp>
          <br />
          <Styledp>
            You and Sorenson agree that each may bring claims against the other
            only in your or its individual capacity, and not as a plaintiff or
            class member in any purported class or representative proceeding.
            Further, unless both you and Sorenson agree otherwise, the
            arbitrator may not consolidate more than one persons claims and may
            not otherwise preside over any 13 form of a representative or class
            proceeding. The arbitrator may award declaratory or injunctive
            relief only in favor of the individual party seeking relief and only
            to the extent necessary to provide relief warranted by that partys
            individual claim. If any portion of this paragraph is found to be
            unenforceable, then the entirety of this Section 9 shall be null and
            void. The arbitration process established by this Section 9 is
            governed by the Federal Arbitration Act (“FAA”). You and Sorenson
            each agree that the FAAs provisions—and not state law—govern all
            questions of whether a Dispute is subject to arbitration. To the
            extent this Agreement conflicts with the JAMS Policy on Consumer
            Arbitrations Pursuant to Pre-Dispute Clauses Minimum Standards of
            Procedural Fairness (the “Minimum Standards”), the Minimum Standards
            in that regard will apply. However, nothing in this paragraph will
            require or allow you or Sorenson to arbitrate on a class-wide,
            representative, or consolidated basis.
          </Styledp>
          <br />
          <Styledh1>Arbitration and Filing Procedures</Styledh1>
          <br />
          <Styledp>
            Before you take a dispute to arbitration, you must first write to us
            at Sorenson Communications, LLC, c/o Legal Dept., 4192 South
            Riverboat Road, Suite 100, Salt Lake City, Utah 84123, U.S.A., and
            give us an opportunity to resolve the dispute. Similarly, before
            Sorenson takes a dispute to arbitration, Sorenson will first attempt
            to resolve it by contacting you. If the dispute cannot be
            satisfactorily resolved within sixty days from the date you or
            Sorenson is notified by the other of a dispute, then either party
            may commence an arbitration before JAMS. Information about the JAMS,
            the arbitration process, JAMSs arbitration rules and procedures, and
            JAMSs fees is available from JAMS on the Internet at
            www.jamsadr.com. Any claim or Dispute subject to arbitration under
            this Agreement must be brought within two (2) years after the date
            the basis for the claim or dispute first arises. Unless applicable
            substantive law provides otherwise, each party will pay its own
            expenses to participate in the arbitration, including attorneys
            fees, and expenses for witnesses, document production and
            presentation of evidence. Unless prohibited by law, the party
            prevailing before the arbitrator shall be entitled to recover the
            JAMSs fees and the expenses of the arbitrator from the other party.
            Governing Law. This Agreement will be governed by the law of the
            State of Utah, without regard to its choice of law rules, except
            that the arbitration provisions of this Agreement will be governed
            by the Federal Arbitration Act. This governing law provision applies
            no matter where you reside, or where you use the Hardware or
            Software.
          </Styledp>
          <br />
          <Styledh1>Waiver</Styledh1>
          <br />
          <Styledp>
            No delay or omission by Sorenson to exercise any right or power it
            has under these Terms and Conditions or to object to the failure of
            any covenant of you to be performed in a timely and complete manner,
            shall impair any such right or power or be construed as a waiver of
            any succeeding breach or any other covenant. Any waivers by Sorenson
            must be in writing and signed by an authorized representative of
            Sorenson.
          </Styledp>
          <br />
          <Styledh1>Entire Agreement</Styledh1>
          <br />
          <Styledp>
            These Terms and Conditions constitute the entire agreement between
            you and Sorenson as it relates to the access to, and use of, the
            Platform and Websites and the subject matter of these Terms and
            Conditions and supersede all prior or contemporaneous agreements,
            negotiations, representations and proposals, written or oral between
            Sorenson and you.
          </Styledp>
          <br />
          <Styledh1>Electronic Documents</Styledh1>
          <br />
          <Styledp>
            This electronic document, and all other electronic documents
            referred to or incorporated herein, will be: (a) deemed for all
            purposes to be a "writing" or "in writing", and to comply with all
            statutory, contractual, and other legal requirements for a writing;
            and (b) legally enforceable as a signed agreement. A printed version
            of these Terms and Conditions and any notice given in electronic
            form shall be admissible in judicial proceedings or administrative
            proceedings based upon or relating to these Terms and Conditions to
            the same extent and subject to the same conditions as other business
            documents and records originally generated and maintained in printed
            form.
          </Styledp>
          <br />
          <Styledh1>Assignment</Styledh1>
          <br />
          <Styledp>
            These Terms and Conditions are personal to you, and are not
            assignable, transferable, or sublicensable by you except with
            Sorenson's prior written consent. Sorenson may assign, transfer, or
            delegate any of its rights and obligations hereunder without your
            consent.
          </Styledp>
          <br />
          <Styledh1>Language</Styledh1>
          <br />
          <Styledp>
            English shall be the language of these Terms and the parties waive
            any right to use and rely upon any other language or translations*.
            Il est la volonté expresse des parties que les présentes Conditions
            d'utilisation et tous les documents qui s'y rapportent soient
            rédigés en langue anglaise, exception faite des documents pour
            lesquels la loi exige l'usage exclusif du français.*
          </Styledp>
          <br />
          <Styledh1>Contact / Notices</Styledh1>
          <br />
          <Styledp>
            Notices from you to Sorenson must be addressed as follows: Legal
            Dept., Sorenson Communications, LLC 4192 South Riverboat Road, Suite
            100 Salt Lake City, Utah 84123, U.S.A.
          </Styledp>
          <br />
          <Styledp>
            Sorenson’s notice to you, to the extent applicable, may be made by
            postcard, letter, relay service call, email, or software Update. You
            agree to notify us in writing promptly in the event you change your
            address, including but not limited to your email address. Sorenson
            may provide notices or communications to you on the Websites and/or
            Platforms and you agree that such notices shall constitute notice to
            you whether or not you actually access the notice.
          </Styledp>
          <br />
          <a href="mailto:legal@sorenson.com" class="a" target="_blank">
            legal@sorenson.com
          </a>
        </div>
      </Container>

      <div
        style={{
          bottom: 0,
          position: 'sticky',
          left: 0,
          padding: '0px 20px 0px 20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <hr
          style={{
            height: '1px',
            backgroundColor: '#040809',
            opacity: '8%',
            marginBottom: '10px',
          }}
        ></hr>
        <div
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}
        >
          <RightSideButtonContainer>
            <Button
              onClick={() => logout({ returnTo: window.location.origin })}
              variant="transparentNoBorder"
              size="sm"
            >
              {t('Deny')}
            </Button>

            <a href={continueUrl} style={{ textDecoration: 'none' }}>
              <Button
                //onClick={() => {}}
                // disabled={Object.keys(props.errors).length > 0 ? true : false}
                disabled={isDisabled}
                variant="primaryWhite"
                size="sm"
                overrideHover="#00a297"
              >
                {t('Accept')}
              </Button>
            </a>
          </RightSideButtonContainer>
        </div>
      </div>
    </>
  )
}

export default withLDConsumer()(TermsAcceptance)
//export default TermsAcceptance

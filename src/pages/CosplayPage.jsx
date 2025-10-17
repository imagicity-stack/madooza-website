const CosplayPage = ({ onBack, onProceed }) => (
  <div className="cosplay-page">
    <section className="cosplay-hero-block">
      <div className="cosplay-hero-orb" aria-hidden="true" />
      <div className="cosplay-hero-shards" aria-hidden="true" />
      <div className="cosplay-hero-content">
        <div className="cosplay-breadcrumbs">
          <button type="button" onClick={onBack} className="cosplay-link">
            ← Back to Madooza
          </button>
        </div>
        <h1>🎭 COSPLAY ARENA – Step Into the MADVERSE</h1>
        <p>
          Welcome to the wildest corner of MADOOZA — the Cosplay Arena, where imagination takes the stage and reality calls in
          sick. For the first time in Hazaribagh, heroes, villains, and absolute mad-minds will walk together in one grand
          celebration of fandom, art, and chaos. Whether you’re a die-hard anime fan, a Bollywood icon in disguise, or just
          someone with a crazy idea and cardboard armor — this is your moment.
        </p>
        <p>
          The Cosplay Arena isn’t just a dress-up segment; it’s a full-scale experience. Participants will roam the MADOOZA
          grounds in character, interact with the crowd, strike poses at our neon photo booths, and finally battle it out on
          stage during the MAD PARADE — the ultimate cosplay showdown where the audience decides who rules the MADVERSE.
        </p>
        <div className="cosplay-ribbon">First-ever Cosplay Parade in Hazaribagh • Limited slots • Powered by IMAGICITY</div>
      </div>
    </section>

    <section className="cosplay-section">
      <h2>Event Format</h2>
      <div className="cosplay-format-grid">
        <article className="cosplay-format-card">
          <h3>Part 1: Expo Zone</h3>
          <p>Participants freely showcase their characters across campus for photo-ops, reels, and crowd engagement.</p>
        </article>
        <article className="cosplay-format-card">
          <h3>Part 2: The MAD Parade</h3>
          <p>
            A high-energy stage walk where the top 10 cosplayers perform or pose live, followed by crowd voting and final
            judging.
          </p>
        </article>
      </div>
    </section>

    <section className="cosplay-section">
      <h2>Participation Details</h2>
      <ul className="cosplay-list">
        <li>Open for students (any school) and local youth participants.</li>
        <li>₹299 entry for externals.</li>
        <li>Costumes can be from anime, gaming, movies, pop culture, or pure imagination.</li>
        <li>Limited slots — registration is only through the website.</li>
      </ul>
    </section>

    <section className="cosplay-section">
      <h2>Prizes &amp; Titles</h2>
      <div className="cosplay-prizes">
        <article className="cosplay-prize-card">
          <h3>1st Place – The Mad Legend</h3>
          <p>₹3000 + Amazon gift voucher + certificate + feature reel.</p>
        </article>
        <article className="cosplay-prize-card">
          <h3>2nd Place – The Mad Icon</h3>
          <p>₹2000 + certificate + feature reel.</p>
        </article>
        <article className="cosplay-prize-card">
          <h3>3rd Place – Crowd Favorite</h3>
          <p>₹500 + food coupon + certificate.</p>
        </article>
      </div>
      <p className="cosplay-prize-note">
        Bonus titles: <strong>Best Group Cosplay</strong> | <strong>Most Creative Design</strong> | <strong>Judge’s Choice</strong>
      </p>
    </section>

    <section className="cosplay-section">
      <h2>Judging Criteria</h2>
      <div className="cosplay-criteria">
        <div className="criteria-weights">
          <div className="criteria-row">
            <span>Costume Accuracy &amp; Creativity</span>
            <span>40%</span>
          </div>
          <div className="criteria-row">
            <span>Stage Presence / Performance</span>
            <span>25%</span>
          </div>
          <div className="criteria-row">
            <span>Character Portrayal</span>
            <span>20%</span>
          </div>
          <div className="criteria-row">
            <span>Audience Engagement</span>
            <span>15%</span>
          </div>
        </div>
        <div className="criteria-panel">
          Judging Panel: 1 creative representative from Imagicity, 1 faculty member, and 1 local artist / influencer.
        </div>
      </div>
    </section>

    <section className="cosplay-section">
      <h2>Rules &amp; Guidelines</h2>
      <ul className="cosplay-list">
        <li>No dangerous props, sharp objects, or offensive content.</li>
        <li>Keep performances school-safe.</li>
        <li>Arrive at least 1 hour before event start for costume check-in.</li>
        <li>Respect all fellow participants and volunteers.</li>
        <li>Have fun — the madder, the better.</li>
      </ul>
    </section>

    <section className="cosplay-section">
      <h2>Highlights</h2>
      <div className="cosplay-highlight-grid">
        <div className="highlight-card">Neon photo booths &amp; selfie zones.</div>
        <div className="highlight-card">Professional photos + aftermovie coverage by Imagicity.</div>
        <div className="highlight-card">Crowd interactions, live music, and anchor-led energy.</div>
        <div className="highlight-card">Winning entries featured on the official MADOOZA Instagram.</div>
      </div>
    </section>

    <section className="cosplay-cta">
      <div className="cta-inner">
        <div className="cta-text">
          <h2>Ready to rule the MADVERSE?</h2>
          <p>Secure your slot, polish your armor, and get ready for neon glory. Limited registrations at ₹299.</p>
        </div>
        <button type="button" className="neon-button button-pulse" onClick={onProceed}>
          Proceed to Register
        </button>
      </div>
    </section>
  </div>
);

export default CosplayPage;

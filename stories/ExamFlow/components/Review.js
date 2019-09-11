import React from "react";

export const Reviews = () => (
  <div id="reviews" className="room-section webkit-render-fix ">
    <div className="special-row-element row">
      <div className="">
        <div className="row no-side-margin-mobile">
          <div className="col-md-12 padding-top-25">
            <div className="panel-body mob-row">
              <hr />
              <h4 className="row-space-4 font-head">
                1 Review
                <div className="star-rating pull-right">
                  <span className="foreground">
                    <i className="fa fa-star icon-resize" />

                    <i className="fa fa-star icon-resize" />

                    <i className="fa fa-star icon-resize" />

                    <i className="fa fa-star icon-resize" />

                    <i className="fa fa-star icon-resize" />
                  </span>
                  (5.0/5.0)
                </div>
              </h4>
            </div>
            <div className="review-content mob-row">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-2 col-sm-2 col-lg-2 col-xs-12">
                    <div className="review-image text-center">
                      <div
                        href="/elizabethc3/"
                        className="media-photo media-round row-space-1"
                        name="review_23339042"
                      >
                        <img
                          alt="{{rater.commenter.first_name}}"
                          className="img-circle"
                          height="68"
                          src="https://res.cloudinary.com/tuteria/image/upload/c_fill,f_auto,h_68,w_68/v1/profile_pics/placeholder-white.jpg"
                          width="68"
                          data-pagespeed-url-hash="1858718499"
                          onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                        />
                        <div className="padding-top-10">Elizabeth</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 col-sm-10 col-lg-10 col-xs-12">
                    <div className="row-space-2">
                      <div
                        data-review-id="23339042"
                        data-original-text="Besides doing the teaching, he gave the rules of participating in the test which gave better understanding."
                        className="review-text expandable expandable-trigger-more row-space-2"
                      >
                        <div className="expandable-content space-for-mobile">
                          <p className="min-space">
                            Besides doing the teaching, he gave the rules of
                            participating in the test which gave better
                            understanding.
                          </p>

                          <div className="text-muted review-subtext margin-top-15">
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="location pull-left">
                                  <i className="fa fa-map-marker" /> Mma2, Lagos
                                </div>
                                <div className="date pull-right">
                                  Oct. 13, 2018
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

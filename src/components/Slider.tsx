import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { RoundArrowIcon } from "@Icons"
import attrAccept from "attr-accept"
import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import styled from "styled-components"

import Image from "./Image"

interface Props {
  className?: string
}

function TestimonialSlides() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <div>
      {/* <h2> Single Item</h2> */}
      <Slider {...settings}>
        <div>
          <img src="https://images.unsplash.com/photo-1644418515428-d7caeee2dc2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" />
          <div className="slider-description">
            <h1 className="slider-brand">
              <RoundArrowIcon /> e-Think Competitions
            </h1>
            <p className="slider-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </p>
            <h1 className="person_name">Name</h1>
            <p className="person_designation">Student from Symbiosis, Pune</p>
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1644413435139-b61759212c29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          <div className="slider-description">
            <h1 className="slider-brand">
              <RoundArrowIcon /> e-Think Competitions
            </h1>
            <div>
              <p className="slider-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation
              </p>
              <h1 className="person_name">Name</h1>
              <p className="person_designation">Student from Symbiosis, Pune</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export const Slicklider = styled(TestimonialSlides)``

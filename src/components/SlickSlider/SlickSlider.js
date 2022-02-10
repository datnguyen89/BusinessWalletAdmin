import React from 'react'
import PropTypes from 'prop-types'
import { SlickSliderWrapper } from './SlickSliderStyled'
import Slider from 'react-slick'

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}>123</div>
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  )
}

const SlickSlider = props => {
  const { children } = props
  const setting = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <SlickSliderWrapper>
      <Slider {...setting}>
        {children}
      </Slider>
    </SlickSliderWrapper>
  )
}

SlickSlider.propTypes = {}

export default SlickSlider
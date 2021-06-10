import { Component, Prop, State, h, Watch } from '@stencil/core';
import { Image } from './types';
import mock from './mock';

@Component({
  tag: 'fancy-slider',
  styleUrl: 'fancy-slider.css',
  shadow: true,
})

export class FancySlider {
  @Prop() images: Image[] = mock;
  @Prop() initialIndex = 0;

  @Watch('initialIndex') indexChanged(newIndex) {
    this.currentIndex = newIndex;
  }

  @State() currentIndex = this.initialIndex;
  @State() isLoaded = false;

  private goToPreviousSlide = () => {
    const index = this.currentIndex === 0 ? 0 : this.currentIndex - 1;
    this.changeSlide(index);
  }

  private gotToNextSlide = () => {
    const index = this.currentIndex < this.images.length ? this.currentIndex + 1 : this.images.length;
    this.changeSlide(index);
  }

  private changeSlide = (newIndex: number) => {
    this.isLoaded = false;
    setTimeout(() => this.currentIndex = newIndex, 400);
  }

  render() {
    const image = this.images[this.currentIndex];
    const isPreviousDisabled = this.currentIndex === 0;
    const isNextDisabled = this.currentIndex === this.images.length - 1;

    return (
      <div class="slider-wrapper">
        <button class="nav-button" onClick={this.goToPreviousSlide} disabled={isPreviousDisabled} >
          <span class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </span>
        </button>
        <div class="slide" style={{ opacity: this.isLoaded ? '1' : '0' }}>
          <img onLoad={() => this.isLoaded = true} class="image" src={image.urls.regular} alt={image.alt_description} />
          <div class="description">
            <div class="likes">
              <span class="icon">
                <svg
                  viewBox="0 0 24 24">
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z">
                  </path>
                </svg>
              </span>
              {image.likes}
            </div>
            <div class="label">{this.currentIndex + 1} of {this.images.length}</div>
          </div>
        </div>
        <button class="nav-button" onClick={this.gotToNextSlide} disabled={isNextDisabled} >
          <span class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </span>
        </button>
      </div>
    );
  }
}

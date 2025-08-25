import styled from "@emotion/styled"

export const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-transparent-light-300);
  backdrop-filter: blur(8px);
  border-radius: inherit;

  opacity: 0;
  transition: opacity 0.25s ease-in-out;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
`

export const Spinner = styled.div`
  position: relative;
  width: 72px;
  height: 72px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 0;
    border: 3px solid transparent;
  }

  &::before {
    background: conic-gradient(from 0deg, var(--color-orange-500), var(--color-yellow-400), var(--color-orange-500));
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px));
    filter: drop-shadow(0 0 6px var(--color-orange-500)) drop-shadow(0 0 12px var(--color-orange-500));
    animation:
      spin 1.2s linear infinite,
      glow 2s ease-in-out infinite;
  }

  &::after {
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: conic-gradient(from 180deg, var(--color-yellow-400), var(--color-orange-500), var(--color-yellow-400));
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px));
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px));
    filter: drop-shadow(0 0 6px var(--color-yellow-400)) drop-shadow(0 0 12px var(--color-yellow-400));
    animation:
      spinReverse 1.8s linear infinite,
      glow 2.5s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spinReverse {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes glow {
    0%,
    100% {
      filter: drop-shadow(0 0 6px var(--color-orange-500)) drop-shadow(0 0 12px var(--color-orange-500));
    }
    50% {
      filter: drop-shadow(0 0 10px var(--color-orange-300)) drop-shadow(0 0 18px var(--color-orange-300));
    }
  }
`

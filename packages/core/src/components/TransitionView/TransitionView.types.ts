import React from "react";
import { VibeComponentProps } from "../../types";
import { SlideDirection } from "../SlideTransition/SlideTransition.types";

export interface TransitionViewProps extends VibeComponentProps {
  activeStep: number;
  direction: TransitionViewDirection;
  children: React.ReactNode[];
}

export type TransitionViewDirection = SlideDirection;

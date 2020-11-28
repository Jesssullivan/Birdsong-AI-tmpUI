/// <reference types="react" />
declare const React: any;
/**
 * This represents an annotation instance in the side bar next to the image.
 */
export declare class AnnotationInstance extends React.Component {
    constructor(props: any);
    onMouseEnter(): void;
    onMouseLeave(): void;
    onDelete(): void;
    onFocus(): void;
    onClassify(): void;
    onHideOthers(): void;
    onCategoryChange(): void;
    onSupercategoryChange(): void;
    onGroupChange(e: any): void;
    onAnnotateBox(): void;
    onEditSegment(): void;
    onDeleteSegment(): void;
    render(): JSX.Element;
}
export {};

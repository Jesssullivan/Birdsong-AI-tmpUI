/// <reference types="react" />
declare const React: any;
declare const Draw: any;
import "./Leaflet.annotation.css";
export declare class Annotator_tool extends React.Component {
    constructor(props: any);
    /**
     * Runs after the component output has been rendered to the DOM.
     * Initialize the leaflet map and add the annotations.
     */
    componentDidMount(): void;
    /**
     * Try to clean up after ourselves.
     */
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    /****************/
    /**
     * Programmatic Map Move Events
     */
    /**
     * Set up the interface for annotating a spectrogram.
     * We want to:
     *      1. Zoom the spectrogram so that it's height is `targetHeight`
     *      2. Add padding around the spectrogram so that it "starts" in the center "finishes" in the center
     *      3. Compute the image-pixel to map-pixel scale conversion so that we can pan appropriately.
     */
    renderForSpectrogram(targetHeight?: number): void;
    fillMapPrev(): void;
    turnOffDrag(): void;
    turnOffZoom(): void;
    panTo(x: number): void;
    /**
     * Allow all annotation layers to be edited.
     */
    enableEditing(): void;
    /**
     * Prevent annotations from being annotated
     */
    disableEditing(): void;
    enableHotKeys(): void;
    disableHotKeys(): void;
    handleKeyDown(e: any): void;
    /**
     * Create a path style for a box.
     * See: https://leafletjs.com/reference-1.6.0.html#path
     */
    getBoxPathStyle(index: number): any;
    createBoxLayer(): void;
    /**
     * Add an annotation to the image. This will render the bbox and keypoint annotations.
     * @param {*} annotation
     * @param {*} annotationIndex
     */
    addAnnotation(annotation: any, annotationIndex: number): {
        bbox: any;
        segmentation: any;
    };
    /**
     * Add an annotation layer to the leaflet map.
     * @param {*} layer
     */
    addLayer(layer: any): void;
    /**
     * Remove an annotation layer from the leaflet map.
     * @param {*} layer
     */
    removeLayer(layer: any): void;
    /**
     * Add segmentation layers directly to the map instead of annotationFeatures.
     * We do this because editing segmentations requires the painting interface,
     * as opposed to the Leaflet.Draw interface.
     */
    addSegmentationLayer(layer: any): void;
    /**
     * Segmentation layers are not currently part of this.annotationFeatures,
     * they are added directly to the map.
     */
    removeSegmentationLayer(layer: any): void;
    /**
     * Translate the point (if needed) so that it lies within the image bounds
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     * @return {[type]}   [description]
     */
    restrictPointToImageBounds(x: number, y: number): number[];
    /**
     * Clip the layer to be inside the image.
     */
    clipRectangleLayerToImageBounds(layer: {
        getBounds: () => any;
        options: any;
    }): any;
    /**
     * Restrict a segmentation layer to be inside the image bounds.
     */
    clipSegmentationLayerToImageBounds(): void;
    /**
     * Show this annotation.
     * @param {*} annotation
     * @param {*} annotation_layer
     */
    showAnnotation(annotation: any, annotation_layer: {
        [x: string]: any;
        segmentation: any;
    }): void;
    /**
     * Hide this annotation.
     * @param {*} annotation
     * @param {*} annotation_layer
     */
    hideAnnotation(annotation: any, annotation_layer: {
        [x: string]: any;
        segmentation: any;
    }): void;
    /**
     * Allow the user to draw a bbox.
     */
    annotateBBox({ isNewInstance, annotationIndex }?: {
        isNewInstance?: boolean;
        annotationIndex?: any;
    }): void;
    /**
     * Update the "crosshairs" when drawing a box.
     */
    bboxCursorUpdate(e: {
        pageX: number;
        pageY: number;
    }): void;
    cancelAnnotation(): void;
    duplicateAnnotationAtIndex({ annotationIndex, objectCenter }?: {
        annotationIndex: any;
        objectCenter?: any;
    }): any[];
    /**
     * If the annotations are saved back to the server, then this
     * is a mechanism for the UI to set all the current annotations to unmodified.
     * NOTE: there are most likely corner cases that this does not handle (currently annotating when saving)
     */
    setAnnotationsModified(modified: boolean): void;
    /****************/
    /**
     * Map Events
     */
    /**
     * A layer has been moved.
     */
    _layerMoved(e: {
        layer: {
            modified: boolean;
        };
    }): void;
    /**
     * A layer has been resized.
     */
    _layerResized(e: {
        layer: {
            modified: boolean;
        };
    }): void;
    /**
     * We've started drawing a new layer.
     */
    _drawStartEvent(e: {
        offsetY: string;
        offsetX: string;
    }): void;
    /**
     * Check to see if the user successfully created the annotation.
     */
    _drawStopEvent(): void;
    /**
     * Save off the annotation layer that was just created.
     * @param {*} e
     */
    _drawCreatedEvent(e: {
        layer: any;
    }): void;
    /**
     * Duplicate the previous annotation, centered at the mouse location.
     */
    _handleLeafletContextMenu(mouseEvent: any): void;
    /**
     * End Map Events *
     */
    /********************/
    /**
     * Annotation Sidebar Events
     */
    /**
     * Allow the user to annotate a new instance with a bbox.
     */
    handleCreateNewIndividual(): void;
    /**
     * Hide all of the annotations.
     */
    handleHideAllAnnotations(): void;
    handleShowAllAnnotations(): void;
    /**
     * Delete an annotation, removing the annotation layers from the map.
     * @param {*} annotationIndex
     */
    handleAnnotationDelete(annotationIndex: number): void;
    /**
     * Focus on a particular instance by zooming in on it.
     * @param {*} annotationIndex
     */
    handleAnnotationFocus(annotationIndex: number): void;
    /**
     * Classify on a particular instance.
     * @param {*} annotationIndex
     */
    handleAnnotationClassify(annotationIndex: number): void;
    /**
     * Hide all other annotations.
     * @param {*} annotationIndex
     */
    handleHideOtherAnnotations(annotationIndex: number): void;
    /**
     * Show the Category Selection Component to change the category id for this category
     */
    handleAnnotationCategoryChange(annotationIndex: number): void;
    /**
     * Show the Category Selection Component to change the category id for this category
     */
    handleAnnotationSupercategoryChange(annotationIndex: number): void;
    handleAnnotationIsCrowdChange(annotationIndex: number, isCrowd: any): void;
    handleAnnotationDrawBox(annotationIndex: number): void;
    handleAnnotationDoSegmentation(annotationIndex: string | number): void;
    handleAnnotationDeleteSegmentation(annotationIndex: number): void;
    /**
     * End Annotation Sidebar Events
     */
    /*******************************/
    /**
     * Category Selection Events
     */
    handleCategorySelected(categoryIndex: string | number): void;
    /**
     * Remove the category label for this annotation.
     */
    handleCategoryRemoved(): void;
    handleCategorySelectionCancelled(): void;
    /**
     *  End Category Selection Events
     */
    /***********************************/
    /**
     * Segmentation Events
     */
    handleSegmentationFinished(): void;
    /**
     * End Segmentation Events
     */
    /***********************************/
    /**
     * Extract a bbox annotation from a Rectangle layer
     * @param {*} layer
     */
    extractBBox(layer: any): number[];
    extractSegmentation(layer: {
        toGeoJSON: () => any;
    }): any[];
    /**
     * Return the current state of the annotations
     */
    getAnnotations({ modifiedOnly, excludeDeleted }?: {
        modifiedOnly?: boolean;
        excludeDeleted?: boolean;
    }): any[];
    render(): JSX.Element;
}
export { Draw };

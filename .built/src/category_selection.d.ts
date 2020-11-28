/// <reference types="react" />
declare const React: any;
/**
 * This renders a modal for category selection. This is not the
 * smartest implementation especially if there is a large number of classes.
 */
export declare class CategorySelection extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    onCancel(): void;
    onSelect(e: any): void;
    onSelectNone(): void;
    filterData(e: any): void;
    onKeyDown(e: {
        key: string;
    }): void;
    render(): JSX.Element;
}
export {};

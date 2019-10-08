import React from 'react';
import Converter from "./Converter";
import renderer from 'react-test-renderer';

describe("<Converter/>", () => {
    it("test", () => {
        const component = renderer.create(
            <Converter />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
/* eslint react/react-in-jsx-scope: 0, react/prop-types: 0 */
const { InspectorControls } = wp.blocks;
const { TextControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const InspectorPane = ({
  postsEndpoint, categoriesEndpoint, mediaEndpoint, perPage, setAttributes,
}) => (
  <InspectorControls key="controls">
    <div className="site-stats-inspector">
      <h2>Settings</h2>
      <TextControl
        label={__('Enter a REST endpoint for posts.')}
        value={postsEndpoint}
        onChange={(value) => {
          setAttributes({
            postsEndpoint: value,
          });
        }}
      />
      <TextControl
        label={__('Enter a REST endpoint for categories.')}
        value={categoriesEndpoint}
        onChange={(value) => {
          setAttributes({
            categoriesEndpoint: value,
          });
        }}
      />
      <TextControl
        label={__('Enter a REST endpoint for media.')}
        value={mediaEndpoint}
        onChange={(value) => {
          setAttributes({
            mediaEndpoint: value,
          });
        }}
      />
      <RangeControl
        label={__('Enter the number of posts to retreive at a time.')}
        value={perPage}
        onChange={(value) => {
          setAttributes({
              perPage: value,
            });
        }}
        min={1}
        max={99}
      />
    </div>
  </InspectorControls>);

export default InspectorPane;

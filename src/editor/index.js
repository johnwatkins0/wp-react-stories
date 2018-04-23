/* eslint react/react-in-jsx-scope: 0, react/prop-types: 0 */
import InspectorPane from './InspectorPane';

import Stories from '../Stories';

const { registerBlockType } = wp.blocks;

registerBlockType('johnwatkins0/wp-react-stories', {
  title: 'Site Stats',
  category: 'widgets',
  edit: ({
    attributes: {
      postsEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}posts`,
      mediaEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}media`,
      categoriesEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}categories`,
      perPage = 12,
    }, setAttributes,
  }) => [
    <InspectorPane
      postsEndpoint={postsEndpoint}
      mediaEndpoint={mediaEndpoint}
      categoriesEndpoint={categoriesEndpoint}
      perPage={perPage}
      setAttributes={setAttributes}
    />,
    <Stories
      endpoint={postsEndpoint}
      mediaEndpoint={mediaEndpoint}
      categoriesEndpoint={categoriesEndpoint}
      perPage={perPage}
    />,

  ],

  save: ({
    attributes: {
      postsEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}posts`,
      mediaEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}media`,
      categoriesEndpoint = `${wp.api.utils.getRootUrl()}wp-json/${wp.api.versionString}categories`,
      perPage = 12,
    },
  }) => (
    <div
      data-stories
      data-media-endpoint={mediaEndpoint}
      data-categories-endpoint={categoriesEndpoint}
      data-stories-endpoint={postsEndpoint}
      data-per-page={perPage}
    />
  ),
  useOnce: true,
});

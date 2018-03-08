/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var __ = wp.i18n.__;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    RichText = _wp$blocks.RichText,
    MediaUpload = _wp$blocks.MediaUpload,
    InspectorControls = _wp$blocks.InspectorControls,
    BlockDescription = _wp$blocks.BlockDescription,
    _wp$blocks$source = _wp$blocks.source,
    attr = _wp$blocks$source.attr,
    children = _wp$blocks$source.children;
var Button = wp.components.Button;


registerBlockType('gutenberg-jpagano-blocks/media-object', {
	title: __('Media Object'),
	icon: 'list-view',
	category: 'formatting',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2'
		},
		mediaID: {
			type: 'number'
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.media-object__content'
		}
	},
	edit: function edit(props) {
		var focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		var attributes = props.attributes;

		var onChangeTitle = function onChangeTitle(value) {
			props.setAttributes({ title: value });
		};
		var onFocusTitle = function onFocusTitle(focus) {
			props.setFocus(_.extend({}, focus, { editable: 'title' }));
		};
		var onSelectImage = function onSelectImage(media) {
			props.setAttributes({
				mediaURL: media.url,
				mediaID: media.id
			});
		};
		var onChangeContent = function onChangeContent(value) {
			props.setAttributes({ content: value });
		};
		var onFocusContent = function onFocusContent(focus) {
			props.setFocus(_.extend({}, focus, { editable: 'content' }));
		};

		return [!!props.focus && wp.element.createElement(
			InspectorControls,
			{ key: 'inspector' },
			wp.element.createElement(
				BlockDescription,
				null,
				wp.element.createElement(
					'p',
					null,
					__('Media Object is a useful layout block for displaying an item, usually an image, alongside some content, usually text.')
				)
			)
		), wp.element.createElement(
			'div',
			{ className: props.className },
			wp.element.createElement(
				'div',
				{ className: 'media-object' },
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(
						MediaUpload,
						{
							onSelect: onSelectImage,
							type: 'image',
							value: attributes.mediaID,
							render: function render(_ref) {
								var open = _ref.open;
								return wp.element.createElement(
									Button,
									{ className: attributes.mediaID ? 'image-button' : 'button button-large', onClick: open },
									!attributes.mediaID ? __('Upload Image') : wp.element.createElement('img', { src: attributes.mediaURL })
								);
							}
						},
						attributes.mediaID ? wp.element.createElement('img', { src: attributes.mediaURL, className: 'media-object__image', alt: attributes.alt }) : __('Upload Image')
					)
				),
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(RichText, {
						tagName: 'h2',
						className: 'media-object__title',
						placeholder: __('Media Object title'),
						value: attributes.title,
						onChange: onChangeTitle,
						focus: focusedEditable === 'title',
						onFocus: onFocusTitle
					}),
					wp.element.createElement(RichText, {
						tagName: 'div',
						multiline: 'p',
						className: 'media-object__content',
						placeholder: __('Media Object content'),
						value: attributes.content,
						onChange: onChangeContent,
						focus: focusedEditable === 'content',
						onFocus: onFocusContent
					})
				)
			)
		)];
	},
	save: function save(props) {
		var className = props.className,
		    _props$attributes = props.attributes,
		    title = _props$attributes.title,
		    mediaURL = _props$attributes.mediaURL,
		    mediaAlt = _props$attributes.mediaAlt,
		    content = _props$attributes.content;


		return wp.element.createElement(
			'div',
			{ className: className },
			wp.element.createElement(
				'div',
				{ className: 'media-object' },
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					mediaURL && wp.element.createElement('img', { className: 'media-object__image', src: mediaURL, alt: mediaAlt })
				),
				wp.element.createElement(
					'div',
					{ className: 'media-object__section' },
					wp.element.createElement(
						'h2',
						{ className: 'media-object__title' },
						title
					),
					wp.element.createElement(
						'div',
						{ className: 'media-object__content' },
						content
					)
				)
			)
		);
	}
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTIwN2RmNmExYWRjMTZhZjJkMzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jsb2NrLmpzIl0sIm5hbWVzIjpbIl9fIiwid3AiLCJpMThuIiwiYmxvY2tzIiwicmVnaXN0ZXJCbG9ja1R5cGUiLCJSaWNoVGV4dCIsIk1lZGlhVXBsb2FkIiwiSW5zcGVjdG9yQ29udHJvbHMiLCJCbG9ja0Rlc2NyaXB0aW9uIiwic291cmNlIiwiYXR0ciIsImNoaWxkcmVuIiwiQnV0dG9uIiwiY29tcG9uZW50cyIsInRpdGxlIiwiaWNvbiIsImNhdGVnb3J5IiwiYXR0cmlidXRlcyIsInR5cGUiLCJzZWxlY3RvciIsIm1lZGlhSUQiLCJtZWRpYVVSTCIsImF0dHJpYnV0ZSIsImNvbnRlbnQiLCJlZGl0IiwiZm9jdXNlZEVkaXRhYmxlIiwicHJvcHMiLCJmb2N1cyIsImVkaXRhYmxlIiwib25DaGFuZ2VUaXRsZSIsInNldEF0dHJpYnV0ZXMiLCJ2YWx1ZSIsIm9uRm9jdXNUaXRsZSIsInNldEZvY3VzIiwiXyIsImV4dGVuZCIsIm9uU2VsZWN0SW1hZ2UiLCJtZWRpYSIsInVybCIsImlkIiwib25DaGFuZ2VDb250ZW50Iiwib25Gb2N1c0NvbnRlbnQiLCJjbGFzc05hbWUiLCJvcGVuIiwiYWx0Iiwic2F2ZSIsIm1lZGlhQWx0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7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T0FBSyxXQUFVLHVCQUFmO0FBRUVyQixpQkFDQyxrQ0FBSyxXQUFVLHFCQUFmLEVBQXFDLEtBQU1BLFFBQTNDLEVBQXNELEtBQU15QixRQUE1RDtBQUhILEtBREQ7QUFRQztBQUFBO0FBQUEsT0FBSyxXQUFVLHVCQUFmO0FBQ0M7QUFBQTtBQUFBLFFBQUksV0FBVSxxQkFBZDtBQUFxQ2hDO0FBQXJDLE1BREQ7QUFFQztBQUFBO0FBQUEsUUFBSyxXQUFVLHVCQUFmO0FBQ0VTO0FBREY7QUFGRDtBQVJEO0FBREQsR0FERDtBQW1CQTtBQXBJMEQsQ0FBNUQsRSIsImZpbGUiOiJibG9jay5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUyMDdkZjZhMWFkYzE2YWYyZDMzIiwiY29uc3QgeyBfXyB9ID0gd3AuaTE4bjtcbmNvbnN0IHtcblx0cmVnaXN0ZXJCbG9ja1R5cGUsXG5cdFJpY2hUZXh0LFxuXHRNZWRpYVVwbG9hZCxcblx0SW5zcGVjdG9yQ29udHJvbHMsXG5cdEJsb2NrRGVzY3JpcHRpb24sXG5cdHNvdXJjZToge1xuXHRcdGF0dHIsXG5cdFx0Y2hpbGRyZW4sXG5cdH0sXG59ID0gd3AuYmxvY2tzO1xuY29uc3QgeyBCdXR0b24gfSA9IHdwLmNvbXBvbmVudHM7XG5cbnJlZ2lzdGVyQmxvY2tUeXBlKCAnZ3V0ZW5iZXJnLWpwYWdhbm8tYmxvY2tzL21lZGlhLW9iamVjdCcsIHtcblx0dGl0bGU6IF9fKCAnTWVkaWEgT2JqZWN0JyApLFxuXHRpY29uOiAnbGlzdC12aWV3Jyxcblx0Y2F0ZWdvcnk6ICdmb3JtYXR0aW5nJyxcblx0YXR0cmlidXRlczoge1xuXHRcdHRpdGxlOiB7XG5cdFx0XHR0eXBlOiAnYXJyYXknLFxuXHRcdFx0c291cmNlOiAnY2hpbGRyZW4nLFxuXHRcdFx0c2VsZWN0b3I6ICdoMicsXG5cdFx0fSxcblx0XHRtZWRpYUlEOiB7XG5cdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHR9LFxuXHRcdG1lZGlhVVJMOiB7XG5cdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdHNvdXJjZTogJ2F0dHJpYnV0ZScsXG5cdFx0XHRzZWxlY3RvcjogJ2ltZycsXG5cdFx0XHRhdHRyaWJ1dGU6ICdzcmMnLFxuXHRcdH0sXG5cdFx0Y29udGVudDoge1xuXHRcdFx0dHlwZTogJ2FycmF5Jyxcblx0XHRcdHNvdXJjZTogJ2NoaWxkcmVuJyxcblx0XHRcdHNlbGVjdG9yOiAnLm1lZGlhLW9iamVjdF9fY29udGVudCcsXG5cdFx0fSxcblx0fSxcblx0ZWRpdDogcHJvcHMgPT4ge1xuXHRcdGNvbnN0IGZvY3VzZWRFZGl0YWJsZSA9IHByb3BzLmZvY3VzID8gcHJvcHMuZm9jdXMuZWRpdGFibGUgfHwgJ3RpdGxlJyA6IG51bGw7XG5cdFx0Y29uc3QgYXR0cmlidXRlcyA9IHByb3BzLmF0dHJpYnV0ZXM7XG5cblx0XHRjb25zdCBvbkNoYW5nZVRpdGxlID0gdmFsdWUgPT4ge1xuXHRcdFx0cHJvcHMuc2V0QXR0cmlidXRlcyggeyB0aXRsZTogdmFsdWUgfSApO1xuXHRcdH07XG5cdFx0Y29uc3Qgb25Gb2N1c1RpdGxlID0gZm9jdXMgPT4ge1xuXHRcdFx0cHJvcHMuc2V0Rm9jdXMoIF8uZXh0ZW5kKCB7fSwgZm9jdXMsIHsgZWRpdGFibGU6ICd0aXRsZScgfSApICk7XG5cdFx0fTtcblx0XHRjb25zdCBvblNlbGVjdEltYWdlID0gbWVkaWEgPT4ge1xuXHRcdFx0cHJvcHMuc2V0QXR0cmlidXRlcygge1xuXHRcdFx0XHRtZWRpYVVSTDogbWVkaWEudXJsLFxuXHRcdFx0XHRtZWRpYUlEOiBtZWRpYS5pZCxcblx0XHRcdH0gKTtcblx0XHR9O1xuXHRcdGNvbnN0IG9uQ2hhbmdlQ29udGVudCA9IHZhbHVlID0+IHtcblx0XHRcdHByb3BzLnNldEF0dHJpYnV0ZXMoIHsgY29udGVudDogdmFsdWUgfSApO1xuXHRcdH07XG5cdFx0Y29uc3Qgb25Gb2N1c0NvbnRlbnQgPSBmb2N1cyA9PiB7XG5cdFx0XHRwcm9wcy5zZXRGb2N1cyggXy5leHRlbmQoIHt9LCBmb2N1cywgeyBlZGl0YWJsZTogJ2NvbnRlbnQnIH0gKSApO1xuXHRcdH07XG5cblx0XHRyZXR1cm4gW1xuXHRcdFx0ISEgcHJvcHMuZm9jdXMgJiYgKFxuXHRcdFx0XHQ8SW5zcGVjdG9yQ29udHJvbHMga2V5PVwiaW5zcGVjdG9yXCI+XG5cdFx0XHRcdFx0PEJsb2NrRGVzY3JpcHRpb24+XG5cdFx0XHRcdFx0XHQ8cD57IF9fKCAnTWVkaWEgT2JqZWN0IGlzIGEgdXNlZnVsIGxheW91dCBibG9jayBmb3IgZGlzcGxheWluZyBhbiBpdGVtLCB1c3VhbGx5IGFuIGltYWdlLCBhbG9uZ3NpZGUgc29tZSBjb250ZW50LCB1c3VhbGx5IHRleHQuJyApIH08L3A+XG5cdFx0XHRcdFx0PC9CbG9ja0Rlc2NyaXB0aW9uPlxuXHRcdFx0XHQ8L0luc3BlY3RvckNvbnRyb2xzPlxuXHRcdFx0KSxcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXsgcHJvcHMuY2xhc3NOYW1lIH0+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtb2JqZWN0XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX3NlY3Rpb25cIj5cblx0XHRcdFx0XHRcdDxNZWRpYVVwbG9hZFxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdD17IG9uU2VsZWN0SW1hZ2UgfVxuXHRcdFx0XHRcdFx0XHR0eXBlPVwiaW1hZ2VcIlxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17IGF0dHJpYnV0ZXMubWVkaWFJRCB9XG5cdFx0XHRcdFx0XHRcdHJlbmRlcj17ICggeyBvcGVuIH0gKSA9PiAoXG5cdFx0XHRcdFx0XHRcdFx0PEJ1dHRvbiBjbGFzc05hbWU9eyBhdHRyaWJ1dGVzLm1lZGlhSUQgPyAnaW1hZ2UtYnV0dG9uJyA6ICdidXR0b24gYnV0dG9uLWxhcmdlJyB9IG9uQ2xpY2s9eyBvcGVuIH0+XG5cdFx0XHRcdFx0XHRcdFx0XHR7ICEgYXR0cmlidXRlcy5tZWRpYUlEID8gX18oICdVcGxvYWQgSW1hZ2UnICkgOiA8aW1nIHNyYz17IGF0dHJpYnV0ZXMubWVkaWFVUkwgfSAvPiB9XG5cdFx0XHRcdFx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHRcdFx0XHRcdCkgfVxuXHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5tZWRpYUlEID9cblx0XHRcdFx0XHRcdFx0XHRcdDxpbWcgc3JjPXsgYXR0cmlidXRlcy5tZWRpYVVSTCB9IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9faW1hZ2VcIiBhbHQ9eyBhdHRyaWJ1dGVzLmFsdCB9IC8+IDpcblx0XHRcdFx0XHRcdFx0XHRcdF9fKCAnVXBsb2FkIEltYWdlJyApXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdDwvTWVkaWFVcGxvYWQ+XG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fc2VjdGlvblwiPlxuXHRcdFx0XHRcdFx0PFJpY2hUZXh0XG5cdFx0XHRcdFx0XHRcdHRhZ05hbWU9XCJoMlwiXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fdGl0bGVcIlxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17IF9fKCAnTWVkaWEgT2JqZWN0IHRpdGxlJyApIH1cblx0XHRcdFx0XHRcdFx0dmFsdWU9eyBhdHRyaWJ1dGVzLnRpdGxlIH1cblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyBvbkNoYW5nZVRpdGxlIH1cblx0XHRcdFx0XHRcdFx0Zm9jdXM9eyBmb2N1c2VkRWRpdGFibGUgPT09ICd0aXRsZScgfVxuXHRcdFx0XHRcdFx0XHRvbkZvY3VzPXsgb25Gb2N1c1RpdGxlIH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8UmljaFRleHRcblx0XHRcdFx0XHRcdFx0dGFnTmFtZT1cImRpdlwiXG5cdFx0XHRcdFx0XHRcdG11bHRpbGluZT1cInBcIlxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX2NvbnRlbnRcIlxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj17IF9fKCAnTWVkaWEgT2JqZWN0IGNvbnRlbnQnICkgfVxuXHRcdFx0XHRcdFx0XHR2YWx1ZT17IGF0dHJpYnV0ZXMuY29udGVudCB9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsgb25DaGFuZ2VDb250ZW50IH1cblx0XHRcdFx0XHRcdFx0Zm9jdXM9eyBmb2N1c2VkRWRpdGFibGUgPT09ICdjb250ZW50JyB9XG5cdFx0XHRcdFx0XHRcdG9uRm9jdXM9eyBvbkZvY3VzQ29udGVudCB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2Pixcblx0XHRdO1xuXHR9LFxuXHRzYXZlOiBwcm9wcyA9PiB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y2xhc3NOYW1lLFxuXHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHR0aXRsZSxcblx0XHRcdFx0bWVkaWFVUkwsXG5cdFx0XHRcdG1lZGlhQWx0LFxuXHRcdFx0XHRjb250ZW50LFxuXHRcdFx0fSxcblx0XHR9ID0gcHJvcHM7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9eyBjbGFzc05hbWUgfT5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fc2VjdGlvblwiPlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRtZWRpYVVSTCAmJiAoXG5cdFx0XHRcdFx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJtZWRpYS1vYmplY3RfX2ltYWdlXCIgc3JjPXsgbWVkaWFVUkwgfSBhbHQ9eyBtZWRpYUFsdCB9IC8+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fc2VjdGlvblwiPlxuXHRcdFx0XHRcdFx0PGgyIGNsYXNzTmFtZT1cIm1lZGlhLW9iamVjdF9fdGl0bGVcIj57dGl0bGV9PC9oMj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWVkaWEtb2JqZWN0X19jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcbn0gKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9jay5qcyJdLCJzb3VyY2VSb290IjoiIn0=
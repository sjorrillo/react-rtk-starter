import React from 'react';
import memoizeOne from 'memoize-one';
import t from '../../core/modules/i18n/i18n-utils';
import nullish from '../../utils/helpers/nullish';
import type { KeyValuePair } from '../../utils/base-types';
import { isFunction, isObject, isString } from '../../utils/helpers/type-of';

type ElementsType = KeyValuePair<string | number | React.ReactElement>;

interface IOwnProps {
  path: string;
  elements: ElementsType;
  namespace?: string;
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const splitElements = (elements: ElementsType) =>
  Object.keys(elements).reduce<string[][]>(
    (acc, key) => {
      const isComponent = isObject(elements[key]);
      acc[isComponent ? 1 : 0].push(key);
      return acc;
    },
    [[], []]
  );

const spreadElementInBetweenItems = (
  element: React.ReactElement | ((idx: number) => React.ReactElement),
  items: string[]
) => {
  const getElement = isFunction(element)
    ? (element as (idx: number) => React.ReactElement)
    : () => element as React.ReactElement;

  return items.slice(1).reduce<React.ReactNode[]>(
    (acc, item, index) => {
      acc.push(getElement(index), item);
      return acc;
    },
    [items[0]]
  );
};

const replaceNode = (
  sourceArray: (React.ReactElement | string)[],
  start: number,
  deleteCount: number,
  itemsArray: React.ReactNode[]
) => {
  [].splice.apply(sourceArray, [start, deleteCount].concat(itemsArray as any) as any);
};

const replaceElements = memoizeOne((path: string, elements: ElementsType) => {
  if (!path) {
    throw new Error('Missing path param');
  }

  if (!isObject(elements)) {
    throw new Error(`Missing or invalid elements "${elements}" (${typeof elements})`);
  }

  const [bindings, nodeElements] = splitElements(elements);
  const translation = t(
    path,
    bindings.reduce(
      (acc, key) => ({
        ...acc,
        [key]: elements[key],
      }),
      {}
    )
  );

  return nodeElements.reduce<(React.ReactElement | string)[]>(
    (nodes, key) => {
      const element = elements[key];
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index] as string;
        if (!isString(node)) {
          continue;
        }

        // Self-Closing tags, e.g., `[foo/]`.
        let values = node.split(`[${key}/]`);
        let valueElements =
          values.length > 1
            ? spreadElementInBetweenItems(element as React.ReactElement, values)
            : [];

        if (!valueElements.length) {
          // Start-end tags, e.g., `[foo]content[/foo]`.
          const tagRegex = new RegExp(`\\[${key}\\][\\s\\S]*?\\[\\/${key}\\]`, 'g');
          const tagContentRegex = new RegExp(`\\[${key}\\]([\\s\\S]*?)\\[\\/${key}\\]`);

          values = node.split(tagRegex);
          if (values.length > 1) {
            const children = (node.match(tagRegex) || []).map((content) =>
              content.replace(tagContentRegex, '$1')
            );
            valueElements = spreadElementInBetweenItems(
              (childIndex) =>
                React.cloneElement(
                  element as React.ReactElement,
                  {},
                  children[childIndex]
                ) as React.ReactElement,
              values
            );
          }
        }

        valueElements.length && replaceNode(nodes, index, 1, valueElements);
      }

      return nodes;
    },
    [translation]
  );
});

// impiration from react-globalize
export const FormatMessage: React.FC<IOwnProps> = ({
  path,
  elements,
  namespace,
  inline = true,
  style,
  ...restProps
}) => {
  const translationKey = React.useMemo(() => {
    const paths = path ? [path] : [];
    !nullish(namespace) && paths.push(namespace as string);

    return paths.join(':');
  }, [path, namespace]);

  return React.createElement(
    inline ? 'span' : 'div',
    {
      'data-component': 'format-message',
      style: { color: 'currentColor', ...(style || {}) },
      ...restProps,
    },
    ...replaceElements(translationKey, elements)
  );
};

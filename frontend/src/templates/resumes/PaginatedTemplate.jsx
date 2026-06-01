import React, { useLayoutEffect, useMemo, useRef, useState } from "react";

const basePageStyle = {
  width: "210mm",
  height: "297mm",
  backgroundColor: "white",
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const baseContentStyle = {
  flex: 1,
  minHeight: 0,
  width: "100%",
  overflow: "hidden",
};

const hiddenMeasureStyle = {
  position: "absolute",
  left: "-10000px",
  top: 0,
  visibility: "hidden",
  pointerEvents: "none",
  zIndex: -1,
};

const blockWrapperStyle = {
  display: "flow-root",
};

const getOuterHeight = (node) => {
  if (!node) return 0;

  const rect = node.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(node);
  const marginTop = parseFloat(computedStyle.marginTop) || 0;
  const marginBottom = parseFloat(computedStyle.marginBottom) || 0;

  return rect.height + marginTop + marginBottom;
};

export default function PaginatedTemplate({
  header = null,
  blocks = [],
  pageStyle = {},
  firstPageContentStyle = {},
  nextPageContentStyle = {},
  renderFooter = null,
  pageBottomReserve = 48,
  splitSafetyBuffer = 32,
}) {
  const blockRefs = useRef({});
  const firstPageContentRef = useRef(null);
  const nextPageContentRef = useRef(null);
  const [pages, setPages] = useState([blocks]);

  const normalizedBlocks = useMemo(
    () =>
      blocks.map((block, index) => ({
        keepWithNext: false,
        keepWithPrevious: false,
        keepSectionTogether: false,
        sectionGroup: null,
        ...block,
        id: block.id || `block-${index}`,
      })),
    [blocks]
  );

  useLayoutEffect(() => {
    const firstPageCapacity = Math.max(
      0,
      (firstPageContentRef.current?.clientHeight || 0) - pageBottomReserve
    );
    const nextPageCapacity = Math.max(
      0,
      (nextPageContentRef.current?.clientHeight || firstPageCapacity) - pageBottomReserve
    );

    if (!firstPageCapacity || !nextPageCapacity) {
      return;
    }

    const heights = normalizedBlocks.map((block) =>
      getOuterHeight(blockRefs.current[block.id])
    );

    if (!normalizedBlocks.length) {
      setPages([[]]);
      return;
    }

    if (!heights.every((height) => height > 0)) {
      return;
    }

    const computedPages = [];
    let currentPage = [];
    let remainingSpace = firstPageCapacity;
    let currentCapacity = firstPageCapacity;

    normalizedBlocks.forEach((block, index) => {
      const blockHeight = heights[index];
      const nextHeight = heights[index + 1] || 0;
      const sectionGroup = block.sectionGroup;
      const sectionStartsHere =
        block.keepSectionTogether &&
        sectionGroup &&
        normalizedBlocks[index - 1]?.sectionGroup !== sectionGroup;

      if (sectionStartsHere && currentPage.length > 0) {
        let sectionHeight = 0;

        for (
          let sectionIndex = index;
          sectionIndex < normalizedBlocks.length &&
          normalizedBlocks[sectionIndex]?.sectionGroup === sectionGroup;
          sectionIndex += 1
        ) {
          sectionHeight += heights[sectionIndex] || 0;
        }

        if (sectionHeight > remainingSpace - splitSafetyBuffer) {
          computedPages.push(currentPage);
          currentPage = [];
          currentCapacity = nextPageCapacity;
          remainingSpace = nextPageCapacity;
        }
      }

      const needsFreshPageForPair =
        block.keepWithNext &&
        currentPage.length > 0 &&
        blockHeight + nextHeight > remainingSpace - splitSafetyBuffer;

      const shouldPullPreviousToNextPage =
        block.keepWithPrevious &&
        currentPage.length > 0 &&
        blockHeight > remainingSpace - splitSafetyBuffer;

      if (shouldPullPreviousToNextPage) {
        const movedBlocks = [];
        const previousBlock = currentPage.pop();
        if (previousBlock) {
          movedBlocks.unshift(previousBlock);
        }

        while (
          currentPage.length > 0 &&
          currentPage[currentPage.length - 1]?.keepWithNext
        ) {
          movedBlocks.unshift(currentPage.pop());
        }

        if (currentPage.length > 0) {
          computedPages.push(currentPage);
        }
        currentPage = movedBlocks;
        currentCapacity = nextPageCapacity;
        const movedHeight = movedBlocks.reduce((total, movedBlock) => {
          const movedIndex = normalizedBlocks.findIndex(
            (candidate) => candidate.id === movedBlock.id
          );
          return total + (heights[movedIndex] || 0);
        }, 0);
        remainingSpace = nextPageCapacity - Math.min(movedHeight, nextPageCapacity);
      }

      if (needsFreshPageForPair) {
        computedPages.push(currentPage);
        currentPage = [];
        currentCapacity = nextPageCapacity;
        remainingSpace = nextPageCapacity;
      }

      if (
        currentPage.length > 0 &&
        blockHeight + splitSafetyBuffer > remainingSpace
      ) {
        computedPages.push(currentPage);
        currentPage = [];
        currentCapacity = nextPageCapacity;
        remainingSpace = nextPageCapacity;
      }

      currentPage.push(block);
      remainingSpace -= Math.min(blockHeight, currentCapacity);
    });

    if (currentPage.length > 0) {
      computedPages.push(currentPage);
    }

    if (computedPages.length > 0) {
      setPages(computedPages);
    }
  }, [
    header,
    normalizedBlocks,
    pageStyle,
    firstPageContentStyle,
    nextPageContentStyle,
    pageBottomReserve,
    splitSafetyBuffer,
  ]);

  return (
    <>
      <div style={hiddenMeasureStyle} aria-hidden="true" data-measure-pages="true">
        <div style={{ ...basePageStyle, ...pageStyle }}>
          {header}
          <div
            ref={firstPageContentRef}
            style={{ ...baseContentStyle, ...firstPageContentStyle }}
          >
            {normalizedBlocks.map((block) => (
              <div
                key={`measure-${block.id}`}
                style={blockWrapperStyle}
                ref={(node) => {
                  if (node) {
                    blockRefs.current[block.id] = node;
                  }
                }}
              >
                {block.node}
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...basePageStyle, ...pageStyle }}>
          <div
            ref={nextPageContentRef}
            style={{ ...baseContentStyle, ...nextPageContentStyle }}
          />
        </div>
      </div>

      {pages.map((pageBlocks, pageIndex) => (
        <div key={`page-${pageIndex}`} style={{ ...basePageStyle, ...pageStyle }}>
          {pageIndex === 0 && header}
          <div
            style={{
              ...baseContentStyle,
              boxSizing: "border-box",
              paddingBottom: `${pageBottomReserve}px`,
              ...(pageIndex === 0 ? firstPageContentStyle : nextPageContentStyle),
            }}
          >
            {pageBlocks.map((block) => (
              <div key={`${pageIndex}-${block.id}`} style={blockWrapperStyle}>
                {block.node}
              </div>
            ))}
          </div>
          {renderFooter ? renderFooter(pageIndex, pages.length) : null}
        </div>
      ))}
    </>
  );
}

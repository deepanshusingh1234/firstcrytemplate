"use client";

import React, { useEffect, useState } from "react";
import { getCPIDSections, getCPIDId } from "../utils/cpid";
import { Section, Column } from "../types/cpid";

declare global {
    interface Window {
        divClicked: (url: string) => void;
    }
}

const CPID = () => {
    const [sections, setSections] = useState<Section[]>([]);
    const [cpidId, setCpidId] = useState<string>("");

    useEffect(() => {
        setSections(getCPIDSections());
        setCpidId(getCPIDId());

        // Define the global divClicked function
        window.divClicked = (url: string) => {
            window.open(url, '_blank');
        };
    }, []);

    const renderContent = (column: Column, columnIndex: number, rowIndex: number) => {
        return column.content.map((item, contentIndex) => {
            if (item.type === 'image') {
                const imgElement = (
                    <img
                        key={`img-${rowIndex}-${columnIndex}-${contentIndex}`}
                        src={item.src}
                        alt={item.alt}
                        title={item.title}
                        className="w-full align-middle"
                        loading="lazy"
                    />
                );

                if (item.hasLink && item.link) {
                    return (
                        <div
                            key={`content-${rowIndex}-${columnIndex}-${contentIndex}`}
                            onClick={() => window.divClicked(item.link!)}
                            className="cursor-pointer"
                        >
                            {imgElement}
                        </div>
                    );
                } else {
                    return (
                        <div key={`content-${rowIndex}-${columnIndex}-${contentIndex}`}>
                            {imgElement}
                        </div>
                    );
                }
            }
            return null;
        });
    };

    return (
        <div id="cpidParent" className="cmn-sec homecpidparent w-full">
            <div className="cpidContainer w-full">
                <input type="hidden" id="TotalCount" value="" />

                {sections.map((section, sectionIndex) => (
                    <div
                        key={`section-${sectionIndex}`}
                        className="html-desktop-data w-full"
                        style={{ marginBottom: section.marginBottom !== 'px' ? section.marginBottom : undefined }}
                    >
                        {section.rows.map((row, rowIndex) => (
                            <React.Fragment key={`row-${sectionIndex}-${rowIndex}`}>
                                <div className="w-full clearfix">
                                    {row.columns.map((column, colIndex) => (
                                        <div
                                            key={`col-${sectionIndex}-${rowIndex}-${colIndex}`}
                                            className="float-left"
                                            style={{ width: `${column.width}%` }}
                                        >
                                            {renderContent(column, colIndex, rowIndex)}
                                        </div>
                                    ))}
                                </div>
                                {/* Add clearfix after each row */}
                                <div className="clear-both"></div>
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CPID;
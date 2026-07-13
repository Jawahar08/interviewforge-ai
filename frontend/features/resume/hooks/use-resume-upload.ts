"use client";

import { useState } from "react";

import { resumeApi } from "../api/resume.api";

import { useResumeStore }
from "../store/resume.store";

export function useResumeUpload() {

    const setAnalysis =
        useResumeStore(
            (s) => s.setAnalysis
        );

    const [loading, setLoading] =
        useState(false);

    const upload = async (
        file: File
    ) => {

        setLoading(true);

        try {

            const result =
                await resumeApi.analyze(
                    file
                );

            setAnalysis(result);

            return result;

        } finally {

            setLoading(false);

        }
    };

    return {

        loading,

        upload,

    };
}
import React from "react";
import PropTypes from "prop-types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SearchFiltersContainer } from "@/components/shared/SearchFilters";

import Layout from "@/components/Layout";
import ContentLayout from "@/components/Layout/ContentLayout";
import { ListBox } from "@/components/shared/dataEntry";
import { AUTHOR_OPTIONS, PRICES } from "@/constants/index";
import { PrimaryButton } from "@/components/shared/Button";

const LessonPlans = (props) => {
  console.log({ AUTHOR_OPTIONS, PRICES });
  const handleLessonPlansSearch = () => {
    // e.preventDefault();
  };
  return (
    <Layout pageTitle="Lesson Plans">
      <ContentLayout title="Lesson Plans">
        <SearchFiltersContainer>
          <form onSubmit={handleLessonPlansSearch}>
            <ListBox
              allObject={{ name: "All Authors", id: "all" }}
              labelText="Author"
              labelValue="author"
              options={AUTHOR_OPTIONS}
            />
            <ListBox
              allObject={{ name: "All Prices", id: "all" }}
              labelText="Price"
              labelValue="price"
              options={PRICES}
            />
            <div>
              <PrimaryButton type="submit" text="Search" />
            </div>
          </form>
        </SearchFiltersContainer>
      </ContentLayout>
    </Layout>
  );
};

LessonPlans.propTypes = {};

export default LessonPlans;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "nav", "home"])),
  },
});

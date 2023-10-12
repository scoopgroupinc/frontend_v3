import React from "react";
import { View, Text } from "react-native";
import { TAGS_BY_ID, TAG_VISIBLE_TYPES } from "../../../utils/types/TAGS";
import { styles } from "../styles";
import { UserTagsEntity, UserTagsTypeVisibleEnity } from "../../../store/features/user/types";

function getSectionBadges(tags: UserTagsEntity[]) {
  return tags.map((tag) => {
    const emoji = TAGS_BY_ID[tag.tagId]?.emoji;
    return (
      <View key={tag.id} style={styles.badge}>
        <Text>
          {emoji}
          {emoji && tag.tagName && " "}
          {tag.tagName}
        </Text>
      </View>
    );
  });
}

export const ProfilePageDetails = ({
  userTags,
}: {
  userTags: { [key: string]: UserTagsTypeVisibleEnity };
}) => (
  <>
    {(userTags[TAG_VISIBLE_TYPES.education]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.ethnicity]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.politics]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.zodiac]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.meyer_briggs]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.religion]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.religious_practice]?.userTags?.length > 0) && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>My Basics</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges([
            ...userTags[TAG_VISIBLE_TYPES.education]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.ethnicity]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.politics]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.zodiac]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.meyer_briggs]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.religion]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.religious_practice]?.userTags,
          ])}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.language]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Languages I know</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.language]?.userTags)}
        </View>
      </View>
    )}

    {(userTags[TAG_VISIBLE_TYPES.relationship_goal]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.relationship_type]?.userTags?.length > 0) && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Relationship Dynamics</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges([
            ...userTags[TAG_VISIBLE_TYPES.relationship_goal]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.relationship_type]?.userTags,
          ])}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.parenting_goal]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Parenting Goals</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.parenting_goal]?.userTags)}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.pets]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Pets</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.pets]?.userTags)}
        </View>
      </View>
    )}

    {(userTags[TAG_VISIBLE_TYPES.creative]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.going_out]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.staying_in]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.travel_goals]?.userTags?.length > 0) && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Travel & Activities</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges([
            ...userTags[TAG_VISIBLE_TYPES.creative]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.going_out]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.staying_in]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.travel_goals]?.userTags,
          ])}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.book_genre]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Books</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.book_genre]?.userTags)}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.film_genre]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Film Genres</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.film_genre]?.userTags)}
        </View>
      </View>
    )}

    {userTags[TAG_VISIBLE_TYPES.music_genre]?.userTags?.length > 0 && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Music</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges(userTags[TAG_VISIBLE_TYPES.music_genre]?.userTags)}
        </View>
      </View>
    )}

    {
      // userTags[TAG_VISIBLE_TYPES.physical_activity_frequency]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.physical_activity]?.userTags?.length > 0 && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeader}>Physical Activity</Text>
          <View style={styles.badgeContainer}>
            {getSectionBadges([
              // ...userTags[TAG_VISIBLE_TYPES.physical_activity_frequency]?.userTags,
              ...userTags[TAG_VISIBLE_TYPES.physical_activity]?.userTags,
            ])}
          </View>
        </View>
      )
    }

    {(userTags[TAG_VISIBLE_TYPES.alcohol_usage]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.smoking_usage]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.drug_usage]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.cannibis_usage]?.userTags?.length > 0) && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Substance Usage</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges([
            ...userTags[TAG_VISIBLE_TYPES.alcohol_usage]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.smoking_usage]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.drug_usage]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.cannibis_usage]?.userTags,
          ])}
        </View>
      </View>
    )}

    {(userTags[TAG_VISIBLE_TYPES.diet]?.userTags?.length > 0 ||
      userTags[TAG_VISIBLE_TYPES.drink]?.userTags?.length > 0) && (
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionHeader}>Dietary Habits</Text>
        <View style={styles.badgeContainer}>
          {getSectionBadges([
            ...userTags[TAG_VISIBLE_TYPES.diet]?.userTags,
            ...userTags[TAG_VISIBLE_TYPES.drink]?.userTags,
          ])}
        </View>
      </View>
    )}
  </>
);

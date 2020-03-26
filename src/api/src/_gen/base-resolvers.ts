/* eslint-disable */
// AUTO GENERATED! PLEASE DO NOT EDIT !!

// Generated boilerplate field resolvers!
//
// Cut-n-paste and fill-em-up
// with glorious logic
//
// goodluckhavefun!
//

import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schema/context'
import {
	GQLResolversTypes,
	GQLCategoryListingConnectionArgs,
	GQLImageUrlArgs,
	GQLListingForDisplayPriceArgs,
	GQLListingForDisplayCreatedAtArgs,
	GQLQueryFrontPageListingsArgs,
	GQLQueryListingArgs,
	GQLQueryListingsArgs,
	GQLQueryUserArgs,
	GQLUserForDisplayCreatedAtArgs,
	GQLUserForDisplayUpdatedAtArgs,
	GQLUserListingConnectionArgs,
	GQLUserFavoriteListingsConnectionArgs,
	GQLUserLabelsConnectionArgs,
	GQLUserReceiptsConnectionArgs,
	GQLUserMessagesConnectionArgs,
} from './server-types'
/**
 **
 ** Category
 **
 **/

const categoryId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const categoryName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			category URL path
			*/
const categorySlug = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			hierarchy
			*/
const categoryParents = async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<any> => {
	// @ts-ignore
	return null
}

const categoryChildren = async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<any> => {
	// @ts-ignore
	return null
}

const categoryIsLeaf = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

/*
			meta
			*/
const categoryIsCars = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

const categoryIsPersonal = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

const categoryNemIdRequired = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

/*
			relationships
			*/
const categoryListingConnection = async (
	parent: any,
	{ cursor, sortBy, reverse }: GQLCategoryListingConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ListingConnection']> => {
	// @ts-ignore
	return null
}

/*
			timestamps
			*/
const categoryCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const categoryUpdatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** CategoryField
 **
 **/

const categoryFieldId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const categoryFieldName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const categoryFieldValue = async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<any> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Country
 **
 **/

const countryId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const countryName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			ISO 3166-1 alpha-2
			*/
const countryCode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			Phone prefix (+45, +44, etc.)
			*/
const countryCallingCode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const countryCallingCodeValidationRegex = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			meta
			*/
const countryCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const countryUpdatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** FavoriteListingConnection
 **
 **/

/*
			A list of edges (same as nodes but with cursor).
			*/
const favoriteListingConnectionEdges = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['FavoriteListingEdge']> => {
	// @ts-ignore
	return null
}

/*
			A list of nodes.
			*/
const favoriteListingConnectionNodes = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Information to aid in pagination.
			*/
const favoriteListingConnectionPageInfo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PageInfo']> => {
	// @ts-ignore
	return null
}

/*
			Identifies the total count of items in the connection.
			*/
const favoriteListingConnectionTotalCount = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** FavoriteListingEdge
 **
 **/

const favoriteListingEdgeNode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Listing']> => {
	// @ts-ignore
	return null
}

const favoriteListingEdgeCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Image
 **
 **/

/*
			Absolute URL for accessing an image
			*/
const imageUrl = async (
	parent: any,
	{ size }: GQLImageUrlArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const imageSize = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ImageSizes']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Label
 **
 **/

const labelId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

/*
			download link
			*/
const labelUrl = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const labelReceiver = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const labelProvider = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['LabelProvider']> => {
	// @ts-ignore
	return null
}

const labelTrackUrl = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const labelLabellessCode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const labelParcelId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			Don't know what this is
			*/
const labelProduct = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['LabelProduct']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** LabelEdge
 **
 **/

const labelEdgeNode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Label']> => {
	// @ts-ignore
	return null
}

const labelEdgeCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** LabelProduct
 **
 **/

const labelProductId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const labelProductSku = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const labelProductName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** LabelProvider
 **
 **/

const labelProviderId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const labelProviderName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** LabelReceipt
 **
 **/

const labelReceiptId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

/*
			Label contains the download link and the purchased LabelProduct
			*/
const labelReceiptLabel = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Label']> => {
	// @ts-ignore
	return null
}

/*
			Payment data
			*/
const labelReceiptOrder = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Order']> => {
	// @ts-ignore
	return null
}

const labelReceiptCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** LabelsConnection
 **
 **/

/*
			A list of edges (same as nodes but with cursor).
			*/
const labelsConnectionEdges = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['LabelEdge']> => {
	// @ts-ignore
	return null
}

/*
			A list of nodes.
			*/
const labelsConnectionNodes = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Information to aid in pagination.
			*/
const labelsConnectionPageInfo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PageInfo']> => {
	// @ts-ignore
	return null
}

/*
			Identifies the total count of items in the connection.
			*/
const labelsConnectionTotalCount = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Listing
 **
 **/

/*
			If no "string literals" (quoted text) precedes the field,
this comment will act as the field's description
			*/
const listingId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const listingSlug = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			Requires authorization!
			*/
const listingOwner = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['User']> => {
	// @ts-ignore
	return null
}

const listingOnline = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

const listingStatus = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ListingStatusEnum']> => {
	// @ts-ignore
	return null
}

const listingCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const listingUpdatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/*
			textual content
			*/
const listingTitle = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const listingDesc = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const listingPublicationTitle = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const listingPublicationDesc = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			pricing
			*/
const listingPrice = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const listingOffersAccepted = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

/*
			Bizz user only
			*/
const listingVatEnabled = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Boolean']> => {
	// @ts-ignore
	return null
}

/*
			relationships
			*/
const listingCategory = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Category']> => {
	// @ts-ignore
	return null
}

const listingPrimaryImage = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Image']> => {
	// @ts-ignore
	return null
}

const listingImages = async (parent: any, args: any, context: Context, info: GraphQLResolveInfo): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Computed field
			*/
const listingForDisplayPrice = async (
	parent: any,
	{ format }: GQLListingForDisplayPriceArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const listingForDisplayCreatedAt = async (
	parent: any,
	{ format }: GQLListingForDisplayCreatedAtArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			misc
			*/
const listingType = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ListingTypeEnum']> => {
	// @ts-ignore
	return null
}

/*
			Bizz user only
			*/
const listingHomepage = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			contact - (might be inherited from owner or listing specific)
			*/
const listingPhone = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			location - (might be inherited from owner or defined for the listing specifically)
			*/
const listingLocation = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Location']> => {
	// @ts-ignore
	return null
}

/*
			Product - package, addons, publications
			*/
const listingProductPackage = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ProductPackage']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ListingConnection
 **
 **/

/*
			A list of edges (same as nodes but with cursor).
			*/
const listingConnectionEdges = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ListingEdge']> => {
	// @ts-ignore
	return null
}

/*
			A list of nodes.
			*/
const listingConnectionNodes = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Information to aid in pagination.
			*/
const listingConnectionPageInfo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PageInfo']> => {
	// @ts-ignore
	return null
}

/*
			Identifies the total count of items in the connection.
			*/
const listingConnectionTotalCount = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ListingEdge
 **
 **/

const listingEdgeNode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Listing']> => {
	// @ts-ignore
	return null
}

const listingEdgeCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ListingReceipt
 **
 **/

const listingReceiptId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

/*
			download link
			*/
const listingReceiptUrl = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			Listing contains the purchased ProductPackage data
			*/
const listingReceiptListing = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Payment data
			*/
const listingReceiptOrder = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Order']> => {
	// @ts-ignore
	return null
}

const listingReceiptCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Location
 **
 **/

const locationAddress = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const locationZipCode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const locationCity = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const locationCountry = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Country']> => {
	// @ts-ignore
	return null
}

const locationLat = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const locationLong = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Message
 **
 **/

const messageId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** MessageEdge
 **
 **/

const messageEdgeNode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Message']> => {
	// @ts-ignore
	return null
}

const messageEdgeCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** MessagesConnection
 **
 **/

/*
			A list of edges (same as nodes but with cursor).
			*/
const messagesConnectionEdges = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['MessageEdge']> => {
	// @ts-ignore
	return null
}

/*
			A list of nodes.
			*/
const messagesConnectionNodes = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Information to aid in pagination.
			*/
const messagesConnectionPageInfo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PageInfo']> => {
	// @ts-ignore
	return null
}

/*
			Identifies the total count of items in the connection.
			*/
const messagesConnectionTotalCount = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Order
 **
 **/

const orderId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

/*
			OrderId
			*/
const orderSku = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const orderPrice = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

const orderPaymentMethod = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PaymentMethodEnum']> => {
	// @ts-ignore
	return null
}

const orderCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** PageInfo
 **
 **/

/*
			Indicates if there are more pages to fetch
(contains either page number or cursor or null)
			*/
const pageInfoNext = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			Indicates if there are any pages prior to the current page
(contains either page number, cursor or null)
			*/
const pageInfoPrevious = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Phone
 **
 **/

const phoneId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const phoneCountry = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Country']> => {
	// @ts-ignore
	return null
}

const phoneValue = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/*
			meta
			*/
const phoneCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const phoneUpdatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ProductAddon
 **
 **/

const productAddonId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const productAddonSku = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const productAddonName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ProductPackage
 **
 **/

const productPackageId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const productPackageSku = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const productPackageName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const productPackageAddons = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

const productPackagePublications = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Publication
 **
 **/

const publicationId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const publicationSku = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const publicationName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const publicationFrom = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const publicationTo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** Query
 **
 **/

const queryApiVersion = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['String']> => {
	// @ts-ignore
	return null
}

const queryFrontPageListings = async (
	parent: any,
	{ cursor, ofGroup, sortBy, reverse }: GQLQueryFrontPageListingsArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

const queryListing = async (
	parent: any,
	{ id }: GQLQueryListingArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Listing']> => {
	// @ts-ignore
	return null
}

const queryListings = async (
	parent: any,
	{ cursor, sortBy, reverse }: GQLQueryListingsArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

const queryUser = async (
	parent: any,
	{ id }: GQLQueryUserArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['User']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ReceiptEdge
 **
 **/

const receiptEdgeNode = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Receipt']> => {
	// @ts-ignore
	return null
}

const receiptEdgeCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** ReceiptsConnection
 **
 **/

/*
			A list of edges (same as nodes but with cursor).
			*/
const receiptsConnectionEdges = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ReceiptEdge']> => {
	// @ts-ignore
	return null
}

/*
			A list of nodes.
			*/
const receiptsConnectionNodes = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<any> => {
	// @ts-ignore
	return null
}

/*
			Information to aid in pagination.
			*/
const receiptsConnectionPageInfo = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['PageInfo']> => {
	// @ts-ignore
	return null
}

/*
			Identifies the total count of items in the connection.
			*/
const receiptsConnectionTotalCount = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['Int']> => {
	// @ts-ignore
	return null
}

/**
 **
 ** User
 **
 **/

const userId = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['UuidV4']> => {
	// @ts-ignore
	return null
}

const userName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const userEmail = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const userUserName = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const userCreatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

const userUpdatedAt = async (
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['DateTime']> => {
	// @ts-ignore
	return null
}

/*
			Formattable fields (fugly! but works)
			*/
const userForDisplayCreatedAt = async (
	parent: any,
	{ format }: GQLUserForDisplayCreatedAtArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const userForDisplayUpdatedAt = async (
	parent: any,
	{ format }: GQLUserForDisplayUpdatedAtArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['NonEmptyString']> => {
	// @ts-ignore
	return null
}

const userListingConnection = async (
	parent: any,
	{ cursor, sortBy, reverse }: GQLUserListingConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ListingConnection']> => {
	// @ts-ignore
	return null
}

const userFavoriteListingsConnection = async (
	parent: any,
	{ pagination, sortBy, reverse }: GQLUserFavoriteListingsConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['FavoriteListingConnection']> => {
	// @ts-ignore
	return null
}

const userLabelsConnection = async (
	parent: any,
	{ pagination, sortBy, reverse }: GQLUserLabelsConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['LabelsConnection']> => {
	// @ts-ignore
	return null
}

const userReceiptsConnection = async (
	parent: any,
	{ pagination, sortBy, reverse }: GQLUserReceiptsConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['ReceiptsConnection']> => {
	// @ts-ignore
	return null
}

/*
			TODO: Needs more args to separate type of messages (own, replies from others, etc.)
			*/
const userMessagesConnection = async (
	parent: any,
	{ pagination, sortBy, reverse }: GQLUserMessagesConnectionArgs,
	context: Context,
	info: GraphQLResolveInfo
): Promise<GQLResolversTypes['MessagesConnection']> => {
	// @ts-ignore
	return null
}

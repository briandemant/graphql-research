/* eslint-disable */
// AUTO GENERATED! PLEASE DO NOT EDIT !!

export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	NonEmptyString: string
	UuidV4: string
	DateTime: Date
	Slug: string
	Version: any
	Md5: string
	Email: any
	URL: any
}

export type Category = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	/** category URL path */
	readonly slug: Scalars['NonEmptyString']
	/** hierarchy */
	readonly parents: Maybe<ReadonlyArray<Category>>
	readonly children: Maybe<ReadonlyArray<Category>>
	readonly isLeaf: Scalars['Boolean']
	/** meta */
	readonly isCars: Scalars['Boolean']
	readonly isPersonal: Scalars['Boolean']
	readonly nemIdRequired: Scalars['Boolean']
	/** relationships */
	readonly listingConnection: Maybe<ListingConnection>
	/** timestamps */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
}

export type CategoryListingConnectionArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/**
 * TODO: Basic implementation, for now.
 * Needs to be refactored, to support different types of values, etc.
 */
export type CategoryField = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Scalars['NonEmptyString']>>
}

export type Country = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	/** ISO 3166-1 alpha-2 */
	readonly code: Scalars['NonEmptyString']
	/** Phone prefix (+45, +44, etc.) */
	readonly callingCode: Scalars['NonEmptyString']
	readonly callingCodeValidationRegex: Scalars['NonEmptyString']
	/** meta */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
}

export type CursorPaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['NonEmptyString']>
	readonly before: Maybe<Scalars['NonEmptyString']>
}

/**
 * For Edges that have a timestamp,
 * documenting the time of the connection
 */
export type DatedEdge = {
	readonly createdAt: Scalars['DateTime']
}

/** Available date formatting */
export enum DateFormatEnum {
	Raw = 'RAW',
	Full = 'FULL',
	Short = 'SHORT',
	Relative = 'RELATIVE',
}

/** ## Interfaces */
export type Entity = {
	readonly id: Scalars['UuidV4']
}

/**
 * TODO: Move to separate FavoriteListing type
 * "Saved-Search of listings" belonging to User, paginated
 */
export type FavoriteListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<FavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Listing>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/**
 * TODO: Move to separate FavoriteListing type
 * Connection details between a "Saved-Search of listings" and a User
 */
export type FavoriteListingEdge = DatedEdge & {
	readonly node: Maybe<Listing>
	readonly createdAt: Scalars['DateTime']
}

export enum FrontpageGroupTypeEnum {
	Default = 'DEFAULT',
	Newest = 'NEWEST',
	User = 'USER',
}

/** Available sorting options */
export enum GenericSortBy {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
}

export type Image = {
	/** Absolute URL for accessing an image */
	readonly url: Scalars['NonEmptyString']
	readonly size: ImageSizes
}

export type ImageUrlArgs = {
	size?: Maybe<ImageSizes>
}

/** Available image sizes */
export enum ImageSizes {
	Thumb = 'THUMB',
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE',
}

export type Label = Entity & {
	readonly id: Scalars['UuidV4']
	/** download link */
	readonly url: Scalars['NonEmptyString']
	readonly receiver: Scalars['NonEmptyString']
	readonly provider: LabelProvider
	readonly trackUrl: Scalars['NonEmptyString']
	readonly labellessCode: Scalars['NonEmptyString']
	readonly parcelId: Scalars['NonEmptyString']
	/** Don't know what this is */
	readonly product: LabelProduct
}

export type LabelEdge = DatedEdge & {
	readonly node: Maybe<Label>
	readonly createdAt: Scalars['DateTime']
}

export type LabelProduct = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
}

export type LabelProvider = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
}

export type LabelReceipt = Entity & {
	readonly id: Scalars['UuidV4']
	/** Label contains the download link and the purchased LabelProduct */
	readonly label: Label
	/** Payment data */
	readonly order: Order
	readonly createdAt: Scalars['DateTime']
}

/** Labels belonging to User, paginated */
export type LabelsConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<LabelEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Label>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/**
 * This text will show up
 * as the object's description
 */
export type Listing = Entity & {
	/**
	 * If no "string literals" (quoted text) precedes the field,
	 * this comment will act as the field's description
	 */
	readonly id: Scalars['UuidV4']
	readonly slug: Scalars['NonEmptyString']
	/** Requires authorization! */
	readonly owner: User
	readonly online: Scalars['Boolean']
	readonly status: ListingStatusEnum
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
	/** textual content */
	readonly title: Scalars['NonEmptyString']
	readonly desc: Scalars['NonEmptyString']
	readonly publicationTitle: Scalars['NonEmptyString']
	readonly publicationDesc: Scalars['NonEmptyString']
	/** pricing */
	readonly price: Scalars['NonEmptyString']
	readonly offersAccepted: Maybe<Scalars['Boolean']>
	/** Bizz user only */
	readonly vatEnabled: Maybe<Scalars['Boolean']>
	/** relationships */
	readonly category: Category
	readonly primaryImage: Maybe<Image>
	readonly images: Maybe<ReadonlyArray<Image>>
	/** Computed field */
	readonly forDisplayPrice: Scalars['NonEmptyString']
	readonly forDisplayCreatedAt: Scalars['NonEmptyString']
	/** misc */
	readonly type: ListingTypeEnum
	/** Bizz user only */
	readonly homepage: Maybe<Scalars['NonEmptyString']>
	/** contact - (might be inherited from owner or listing specific) */
	readonly phone: Maybe<Scalars['NonEmptyString']>
	/** location - (might be inherited from owner or defined for the listing specifically) */
	readonly location: Location
	/** Product - package, addons, publications */
	readonly productPackage: ProductPackage
}

/**
 * This text will show up
 * as the object's description
 */
export type ListingForDisplayPriceArgs = {
	format: Maybe<PriceFormatEnum>
}

/**
 * This text will show up
 * as the object's description
 */
export type ListingForDisplayCreatedAtArgs = {
	format: Maybe<DateFormatEnum>
}

/** Listing connection, paginated */
export type ListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<ListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Listing>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a Listings and an Entity */
export type ListingEdge = DatedEdge & {
	readonly node: Maybe<Listing>
	readonly createdAt: Scalars['DateTime']
}

export enum ListingOrderEnum {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
	Random = 'RANDOM',
}

export type ListingReceipt = Entity & {
	readonly id: Scalars['UuidV4']
	/** download link */
	readonly url: Scalars['NonEmptyString']
	/** Listing contains the purchased ProductPackage data */
	readonly listing: Maybe<ReadonlyArray<Listing>>
	/** Payment data */
	readonly order: Order
	readonly createdAt: Scalars['DateTime']
}

export enum ListingStatusEnum {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Expired = 'EXPIRED',
	Draft = 'DRAFT',
}

export enum ListingTypeEnum {
	Sell = 'SELL',
	Buy = 'BUY',
	Free = 'FREE',
	Trade = 'TRADE',
	/** Properties (Apartments, houses, etc.) */
	Lease = 'LEASE',
	/** Things (Cars, machines, etc.) */
	Rent = 'RENT',
	Other = 'OTHER',
}

/** ## Generic (re-usable) types */
export type Location = {
	readonly address: Maybe<Scalars['NonEmptyString']>
	readonly zipCode: Maybe<Scalars['NonEmptyString']>
	readonly city: Maybe<Scalars['NonEmptyString']>
	readonly country: Country
	readonly lat: Maybe<Scalars['NonEmptyString']>
	readonly long: Maybe<Scalars['NonEmptyString']>
}

export type Message = Entity & {
	readonly id: Scalars['UuidV4']
}

export type MessageEdge = DatedEdge & {
	readonly node: Maybe<Message>
	readonly createdAt: Scalars['DateTime']
}

/** Messages belonging to a User, paginated */
export type MessagesConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<MessageEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Message>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type MutationResponse = {
	readonly code: ResponseCodeEnum
	readonly success: Scalars['Boolean']
	readonly data: Entity
}

export type Order = Entity & {
	readonly id: Scalars['UuidV4']
	/** OrderId */
	readonly sku: Scalars['NonEmptyString']
	readonly price: Scalars['Int']
	readonly paymentMethod: PaymentMethodEnum
	readonly createdAt: Scalars['DateTime']
}

/** Generic pagination info */
export type PageInfo = {
	/**
	 * Indicates if there are more pages to fetch
	 * (contains either page number or cursor or null)
	 */
	readonly next: Maybe<Scalars['NonEmptyString']>
	/**
	 * Indicates if there are any pages prior to the current page
	 * (contains either page number, cursor or null)
	 */
	readonly previous: Maybe<Scalars['NonEmptyString']>
}

export type PagePaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
}

export type PaginatedConnection = {
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export enum PaymentMethodEnum {
	Mobilepay = 'MOBILEPAY',
	Creditcard = 'CREDITCARD',
}

export type Phone = Entity & {
	readonly id: Scalars['UuidV4']
	readonly country: Country
	readonly value: Scalars['NonEmptyString']
	/** meta */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
}

/** Available price formatting */
export enum PriceFormatEnum {
	Raw = 'RAW',
	Full = 'FULL',
	Short = 'SHORT',
	Relative = 'RELATIVE',
}

/** Addons, for granular tweaking of the exposure rules/features. */
export type ProductAddon = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
}

/** A product package defines the general exposure rules/features of the Listing. */
export type ProductPackage = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly addons: Maybe<ReadonlyArray<ProductAddon>>
	readonly publications: Maybe<ReadonlyArray<Publication>>
}

/**
 * Offline exposure (print) of the Listing.
 * Which publication/newspaper will the Listing appear in.
 */
export type Publication = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly from: Scalars['DateTime']
	readonly to: Scalars['DateTime']
}

/** this is just to be able to return something in this separate schema file */
export type Query = {
	readonly apiVersion: Scalars['String']
	readonly frontPageListings: ReadonlyArray<Listing>
	readonly listing: Maybe<Listing>
	readonly listings: ReadonlyArray<Listing>
	readonly user: Maybe<User>
}

/** this is just to be able to return something in this separate schema file */
export type QueryFrontPageListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	ofGroup?: Maybe<FrontpageGroupTypeEnum>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryListingArgs = {
	id: Scalars['UuidV4']
}

/** this is just to be able to return something in this separate schema file */
export type QueryListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryUserArgs = {
	id: Scalars['UuidV4']
}

export type Receipt = ListingReceipt | LabelReceipt

export type ReceiptEdge = DatedEdge & {
	readonly node: Maybe<Receipt>
	readonly createdAt: Scalars['DateTime']
}

/** Receipts belonging to User, paginated */
export type ReceiptsConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<ReceiptEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Receipt>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Bare minium mutation response */
export enum ResponseCodeEnum {
	Ok = 'OK',
	NotFound = 'NOT_FOUND',
	Error = 'ERROR',
}

/** authorization */
export enum RoleEnum {
	Admin = 'ADMIN',
	User = 'USER',
}

export type User = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Maybe<Scalars['NonEmptyString']>
	readonly email: Maybe<Scalars['NonEmptyString']>
	readonly userName: Maybe<Scalars['NonEmptyString']>
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
	/** Formattable fields (fugly! but works) */
	readonly forDisplayCreatedAt: Scalars['NonEmptyString']
	readonly forDisplayUpdatedAt: Scalars['NonEmptyString']
	readonly listingConnection: Maybe<ListingConnection>
	readonly favoriteListingsConnection: Maybe<FavoriteListingConnection>
	readonly labelsConnection: Maybe<LabelsConnection>
	readonly receiptsConnection: Maybe<ReceiptsConnection>
	/** TODO: Needs more args to separate type of messages (own, replies from others, etc.) */
	readonly messagesConnection: Maybe<MessagesConnection>
}

export type UserForDisplayCreatedAtArgs = {
	format: Maybe<DateFormatEnum>
}

export type UserForDisplayUpdatedAtArgs = {
	format: Maybe<DateFormatEnum>
}

export type UserListingConnectionArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type UserFavoriteListingsConnectionArgs = {
	pagination: Maybe<PagePaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type UserLabelsConnectionArgs = {
	pagination: Maybe<PagePaginationParams>
	sortBy?: Maybe<GenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
}

export type UserReceiptsConnectionArgs = {
	pagination: Maybe<PagePaginationParams>
	sortBy?: Maybe<GenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
}

export type UserMessagesConnectionArgs = {
	pagination: Maybe<PagePaginationParams>
	sortBy?: Maybe<GenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
}

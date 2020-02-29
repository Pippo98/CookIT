package com.example.cookit.Models


//======================== Second Version ========================//

data class RecipeDetails(
    val _id: String,
    val cookTime: Int,
    val cookingMethod: String,
    val description: String,
    val estimatedCost: String,
    val image: String,
    val name: String,
    val nutrition: Nutrition,
    val prepTime: Int,
    val recipeCategory: String,
    val recipeIngredient: List<RecipeIngredient>,
    val recipeInstructions: String,
    val recipeYield: Int,
    val suitableForDiet: List<String>
)

data class RecipeIngredient(
    val quantity: String,
    val type: String,
    val unit: String
)

data class Nutrition(
    val calories: String,
    val carbohydrateContent: String,
    val cholesterolContent: String,
    val fatContent: String,
    val fiberContent: String,
    val saturatedFatContent: String,
    val sodiumContent: String,
    val sugarContent: String,
    val type: String
)




//======================== First Version ========================//
/*
data class RecipeDetails(
    val aggregateRating: AggregateRating,
    val author: Author,
    val context: String,
    val cookTime: String,
    val dateModified: String,
    val datePublished: String,
    val description: String,
    val estimatedCost: String,
    val image: String,
    val interactionStatistic: InteractionStatistic,
    val name: String,
    val nutrition: Nutrition,
    val prepTime: String,
    val recipeCategory: String,
    val recipeIngredient: List<String>,
    val recipeInstructions: List<String>,
    val recipeYield: Int,
    val totalTime: String,
    val type: String,
    val video: Video
)

data class Video(
    val description: String,
    val duration: String,
    val embedUrl: String,
    val name: String,
    val thumbnailUrl: String,
    val type: String,
    val uploadDate: String
)
data class Nutrition(
    val calories: String,
    val carbohydrateContent: String,
    val cholesterolContent: String,
    val fatContent: String,
    val fiberContent: String,
    val saturatedFatContent: String,
    val sodiumContent: String,
    val sugarContent: String,
    val type: String
)

data class InteractionStatistic(
    val interactionType: String,
    val type: String,
    val userInteractionCount: String
)

data class Author(
    val name: String,
    val type: String
)

data class AggregateRating(
    val bestRating: Int,
    val ratingCount: Int,
    val ratingValue: Double,
    val type: String
)*/
package com.example.cookit

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.cookit.Models.RecipeDetails
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.layout_list_item.view.*
import kotlinx.android.synthetic.main.spinner_conf3.view.*

class RecyclerViewAdapter(recipes: List<RecipeDetails>?): RecyclerView.Adapter<CustomViewHolder>(){

    private var recipes = recipes
    private lateinit var context: Context

    override fun getItemCount(): Int {
        return recipes!!.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        context = parent.context
        val layoutInflator = LayoutInflater.from(context)
        var cell = layoutInflator.inflate(R.layout.layout_list_item, parent, false)

        return CustomViewHolder(cell)
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
        holder.view.recipe_title.text = recipes!![position].name
        holder.view.recipe_cooktime.text = "Time: ${recipes!![position].cookTime + recipes!![position].prepTime}"
        Picasso.with(context).load(recipes!![position].image).into(holder.view.recipe_image)
    }
}

class CustomViewHolder (val view: View): RecyclerView.ViewHolder(view){

}
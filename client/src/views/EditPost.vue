<template>
   <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Editar Post</v-card-title>
                    <v-divider></v-divider>
                    <v-form @submit.prevent="updateForm" ref="form" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Título" v-model="post.title" prepend-icon="mdi-note" >

                        </v-text-field>
                        <v-text-field label="Categoria" v-model="post.category"  prepend-icon="mdi-view-list" >
                        </v-text-field>
                        <v-textarea label="Conteúdo" prepend-icon="mdi-note-plus" v-model="post.content" ></v-textarea>
                        <v-file-input @change="selectFile"  show-size counter multiple label="Selecionar imagem"></v-file-input>
                        <v-img :src="`/${post.image}`" width="200"></v-img>
                        <v-btn type="submit" class="mt-3" color="primary">Atualizar</v-btn>
                    </v-form>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import API from '../api'

export default {
    data(){
        return{
       
            post:{
                title:"",
                category:"",
                content:"",
                image:""
            },
            image:"",
        }
    },
    async created() {
        const response =  await API.getPostById(this.$route.params.id)
        this.post = response
    },
    methods: {
      selectFile(file){
        this.image = file[0]
      },
      async updateForm(){
        const formData = new FormData()
        formData.append('image',this.image)
        formData.append('title',this.post.title)
        formData.append('category',this.post.category)
        formData.append('content',this.post.content)
        formData.append('old_image',this.post.image)
        if (this.$refs.form.validate()) {
            const response = await API.uptadePost(this.$route.params.id,formData)
            this.$router.push({name:'home',params:{message:response.message}})
        }
      }  

    },
}
</script>
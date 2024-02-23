<template>
  <div
    class="upload-image relative d-flex d-flex justify-center align-center flex-column"
  >
    <input
      ref="file"
      type="file"
      hidden
      id="logo"
      accept="image/*"
      @change="handleFileChange"
    />

    <div class="relative upload-image_image">
      <img
        :src="selectedFile || require('@/assets/imgs/default-image.png')"
        alt="profile image"
        width="100%"
        height="100%"
      />

      <div
        v-if="selectedFile && hasDeleteOption"
        class="d-flex align-center justify-center upload-image__delete-container"
      >
        <v-icon color="error" class="upload-image__delete" @click="deleteImage"
          >mdi-delete</v-icon
        >
      </div>
    </div>
    <div class="d-flex mt-1">
      <div @click="$refs.file.click()" class="w-100">
        <v-btn
          class="text-lowercase"
          outlined
          color="primary"
          width="100%"
          height="40"
        >
          <div class="d-flex align-center flex-column flex-sm-row">
            <v-icon left>mdi-upload</v-icon>
            <span class="font-size-12 font-weight-bold">
              {{ $t("upload_image") }}
            </span>
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  props: {
    imagePreview: {
      type: String,
      default: () => "",
    },
    buttonColor: {
      type: String,
      default: () => "light-primary",
    },
    name: {
      type: String,
      default: () => "",
    },
    seperatedLabel: {
      type: String,
      default: "",
    },
    hasDeleteOption: {
      type: Boolean,
      default: true,

    },
 
  },
  data() {
    return {
      selectedFile: this.imagePreview ?? null,
      file: {},
    };
  },
  methods: {
    uploadImage() {
      this.$refs.file.click();
    },
    handleFileChange(e) {
      if (e.target.files.length > 0) {
        const imageFile = e.target.files[0];
        this.selectedFile = URL.createObjectURL(imageFile);
        const dataObj = {
          file: imageFile,
          ImageUrl: this.selectedFile,
        };

        this.$emit("add-image", e, dataObj);
      }
    },

    deleteImage() {
      this.selectedFile = null;
      this.$emit("delete-image");
    },
  },
};
</script>
<style lang="scss">
@import "index.scss";
</style>

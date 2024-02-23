<template>
  <section>
    <v-btn min-width="20px" text color="primary" icon @click="dialog = true">
      <v-icon>{{ iconName }} </v-icon>
    </v-btn>
    <CustomDialog
      maxWidth="650"
      :dialog="dialog"
      @close-dialog="dialog = false"
    >
      <template #header>
        <DialogHeader :title="$t('image')" />
      </template>
      <ImageUpload
        @add-image="addImage"
        :imagePreview="form.imageUrl"
        :seperatedLabel="$t('image')"
        :hasDeleteOption="hasDeleteOption"
        @delete-image="deleteImage"
      />
    </CustomDialog>
  </section>
</template>



<script>
export default {
  name: "ImageDialog",
  data() {
    return {
      form: {
        imageUrl: this.image || "",
      },
      dialog: false,
      imagePerview: null,
    };
  },
  props: {
    id: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    hasDeleteOption: {
      type: Boolean,
      default: true,
    },
    deleteUrl: {
      type: String,
      default: "",
    },
    iconName: {
      type: String,
      default: "mdi-image",
    },
    keyName: {
      type: String,
      default: () => "id",
    },
  },

  methods: {
    addImage(event, imageData) {
      this.form.imageUrl = imageData.file;
      this.imagePreview = imageData.imageUrl;
      this.$http
        .post({
          reqName: this.url,
          data: this.generateData(),
        })
        .then(() => {
          this.dialog = false;
          this.$emit("update-table");
        });
    },
    generateData() {
      const data = new FormData();
      data.append("Image", this.form.imageUrl);
      data.append(this.keyName, this.id);

      return data;
    },
    deleteImage() {
      this.form.imageUrl = "";
      this.$http
        .delete({
          reqName: `${this.deleteUrl}?Id=${this.id}`,
        })
        .then(() => {
          this.dialog = false;
          this.$emit("update-table");
        });
    },
  },
};
</script>